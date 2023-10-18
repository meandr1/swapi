import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { ImagesModule } from 'src/images/images.module';
import { Image } from 'src/images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starship, Person, Film, Image]),
    ImagesModule
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService],
  exports: [StarshipsService]
})
export class StarshipsModule {}
