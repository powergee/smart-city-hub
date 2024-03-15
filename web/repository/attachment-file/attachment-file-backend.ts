import { AttachmentFileMeta } from "core/model";
import { AttachmentFileRepository } from "core/repository";

type AttachmentFileDTO = {
  fileId: number;
  originalName: string;
  localPath: string;
  parentArticleId: number;
  meta: {
    createdAt: Date;
    modifiedAt: Date;
  };
};

export default class AttachmentFileBackendRepo implements AttachmentFileRepository {
  private readonly BASE_URL = "https://global.urbanscience.uos.ac.kr";

  async upload(file: File): Promise<AttachmentFileMeta> {
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<AttachmentFileMeta> {
    throw new Error("Method not implemented.");
  }

  async getInfo(id: number): Promise<AttachmentFileMeta> {
    const res = await fetch(`${this.BASE_URL}/v1/files/info/${id}`);
    const data = (await res.json()) as AttachmentFileDTO;

    return {
      id: data.fileId,
      name: data.originalName,
      href: `${this.BASE_URL}/v1/files/download/${data.fileId}`,
    };
  }
}
