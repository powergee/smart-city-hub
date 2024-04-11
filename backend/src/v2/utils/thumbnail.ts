import { ThumbnailGenerator, ImageResizer, FileItem } from "../core/model";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import pdf2pic from "pdf2pic";

type ImageResizerOptions = {
  width: number;
};

export function createImageResizer({ width }: ImageResizerOptions): ImageResizer {
  return async (buffer: Buffer) => {
    const image = await sharp(buffer).resize({ width }).webp().toBuffer();
    return image;
  };
}

export function createThumbnailGenerator(): ThumbnailGenerator {
  return async (fileItem: FileItem) => {
    const ext = path.extname(fileItem.localPath);

    let buffer = null;
    if (ext === ".pdf") {
      const convert = pdf2pic.fromPath(fileItem.localPath, {
        preserveAspectRatio: true,
      });
      buffer = (await convert(1, { responseType: "buffer" })).buffer;
    } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      buffer = await fs.readFile(fileItem.localPath);
    }

    if (buffer) {
      return buffer;
    } else {
      return null;
    }
  };
}
