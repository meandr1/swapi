import { BadRequestException, Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { LocalFilesService } from './local.files.service';
import { S3FilesService } from './s3.files.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private localFilesService: LocalFilesService,
    private s3FilesService: S3FilesService
  ) {}

  async getImageByID(res: Response, id: number) {
    const image = await this.getImageOrThrowException(id);
    return this.s3FilesService.getFileByName(res, image.name);
    // return this.localFilesService.getFileByName(res, image.name);
  }

  async saveImage(image: Image, files: Express.Multer.File[]) {
    const images = await Promise.all(
      files.map(async (file) => {
        const img: Image = { ...image };
        const fileName = this.uuidService(file);
        img.name = await this.s3FilesService.saveFile(file, fileName);
        // img.name = await this.localFilesService.saveFile(file, fileName);
        return img;
      })
    );
    return await this.imagesRepository.save(images);
  }

  async deleteImageByID(id: number) {
    const image = await this.getImageOrThrowException(id);
    await this.s3FilesService.deleteFileByName(image.name);
    // await this.localFilesService.deleteFileByName(image.name);
    return await this.imagesRepository.remove(image);
  }

  async getImageOrThrowException(id: number) {
    const image = await this.imagesRepository.findOneBy({ id });
    if (!image)
      throw new BadRequestException(`Image with ID = ${id} does not exists`);
    return image;
  }

  uuidService(file: Express.Multer.File) {
    const extension = file.originalname.split('.').pop();
    const name = uuidv4();
    const newFileName = name + '.' + extension;
    return newFileName;
  }
}
