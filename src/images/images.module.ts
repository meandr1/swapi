import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { LocalFilesService } from './local.files.service';
import { S3FilesService } from './s3.files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImagesService, LocalFilesService, S3FilesService],
  exports: [ImagesService],
  controllers: [ImagesController]
})
export class ImagesModule {}
