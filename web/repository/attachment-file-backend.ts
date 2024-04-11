import { AttachmentFile, AuthTokenGetter } from "core/model";
import { AttachmentFileRepository } from "core/repository";

type FileItemDTO = {
  fileId: number;
  name: string;
  localPath: string;
};

export default class AttachmentFileBackendRepo implements AttachmentFileRepository {
  private readonly baseUrl: string;
  private readonly publicUrl: string;
  private readonly getAccessToken: AuthTokenGetter;

  constructor(params: { apiUrl: string; publicUrl: string; authTokenGetter: AuthTokenGetter }) {
    this.baseUrl = params.apiUrl;
    this.publicUrl = params.publicUrl;
    this.getAccessToken = params.authTokenGetter;
  }

  async upload(file: File): Promise<AttachmentFile> {
    const accessToken = this.getAccessToken();
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${this.baseUrl}/v2/file/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    });
    const fileItem: FileItemDTO = await res.json();
    return {
      id: fileItem.fileId,
      name: fileItem.name,
      href: `${this.publicUrl}/v2/file/download/${fileItem.fileId}`,
    };
  }

  async delete(id: number): Promise<AttachmentFile> {
    throw new Error("Method not implemented.");
  }

  async getInfo(id: number): Promise<AttachmentFile> {
    const nameRes = await fetch(`${this.baseUrl}/v2/file/name/${id}`);
    return {
      id: id,
      name: await nameRes.text(),
      href: `${this.publicUrl}/v2/file/download/${id}`,
    };
  }
}
