import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3FilesService {
  async getFileByName(res: Response, fileName: string) {
    const s3 = new S3();
    const file = await s3
      .getObject({
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: fileName
      })
      .promise();
    const fileExt = fileName.split('.').pop()?.toLowerCase() || '';
    if (file.Body && Buffer.isBuffer(file.Body)) {
      res.set('Content-Type', `image/${fileExt}`).send(file.Body);
    }
    throw new InternalServerErrorException(
      'Something goes wrong during getting file from AWS'
    );
  }

  async saveFile(file: Express.Multer.File, fileName: string) {
    const s3 = new S3();
    try {
      const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Body: file.buffer,
        Key: fileName
      })
      .promise();
    return uploadResult.Key;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during saving file to AWS'
      );
    }
    
  }

  async deleteFileByName(fileName: string) {
    const s3 = new S3();
    try {
      return await s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME || '',
          Key: fileName
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during deleting file from AWS'
      );
    }
  }
}
