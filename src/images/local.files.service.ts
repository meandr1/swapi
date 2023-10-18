import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { Response } from 'express';

@Injectable()
export class LocalFilesService {
  private path = resolve(__dirname, '..', '..', 'uploads');

  async getFileByName(res: Response, fileName: string) {
    return res.sendFile(this.path + '/' + fileName);
  }

  async saveFile(file: Express.Multer.File, fileName: string) {
    await writeFile(this.path + '/' + fileName, file.buffer);
    return fileName;
  }

  async deleteFileByName(name: string) {
    return await unlink(this.path + '/' + name);
  }
}
