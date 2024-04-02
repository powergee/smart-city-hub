import { FileItem } from "../core/model";
import { FileItemRepository } from "../core/repository";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

export class FileItemMongoRepo implements FileItemRepository {
  static readonly schema = new mongoose.Schema({
    fileId: { type: Number, unique: true },
    originalName: String,
    localPath: String,
    parentArticleId: Number,
    meta: {
      createdAt: { type: Date, default: Date.now },
      modifiedAt: { type: Date, default: Date.now },
    },
  });
  private readonly FileModel;
  private readonly baseDir: string;

  constructor(params: { db: mongoose.Connection; collectionName: string; baseDir: string }) {
    this.FileModel = params.db.model(params.collectionName, FileItemMongoRepo.schema);
    this.baseDir = params.baseDir;
  }

  async put(name: string, filePath: string): Promise<FileItem> {
    try {
      // check if the file exists and is accessible
      fs.accessSync(filePath);
    } catch (err) {
      throw new Error(`file ${filePath} does not exist or is not accessible.`);
    }

    let localPath = `${this.baseDir}/${path.basename(filePath)}`;
    if (fs.existsSync(localPath)) {
      // check if the file exists in the baseDir, if so, append "_copy" suffix to the file name
      const ext = path.extname(filePath);
      const baseName = path.basename(filePath, ext);
      localPath = `${this.baseDir}/${baseName}_copy${ext}`;
    }

    // find latest fileId
    const maxFileId = await this.FileModel.findOne().sort({ fileId: -1 });
    const fileId = maxFileId ? maxFileId.fileId! + 1 : 1;

    try {
      // create a new FileModel document
      const res = await this.FileModel.create({
        fileId,
        originalName: name,
        localPath,
        parentArticleId: -1,
      });

      // copy the file to the base directory preserving the file name
      fs.copyFileSync(filePath, localPath);
    } catch (err) {
      throw new Error(`failed to put file ${name}: ${err}`);
    }

    return {
      fileId,
      name,
      localPath,
    };
  }

  async get(fileId: number): Promise<FileItem | null> {
    const res = await this.FileModel.findOne({ fileId });
    if (res === null) {
      return null;
    }

    const localPath = `${this.baseDir}/${path.basename(res.localPath!)}`;
    return {
      fileId: res.fileId!,
      name: res.originalName!,
      localPath,
    };
  }

  async rm(fileId: number): Promise<boolean> {
    const res = await this.FileModel.findOneAndDelete({ fileId });
    if (res === null) {
      return false;
    }

    const localPath = `${this.baseDir}/${path.basename(res.localPath!)}`;
    fs.unlinkSync(localPath);
    return true;
  }
}
