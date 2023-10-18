import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { Person } from 'src/people/entities/person.entity';
import { Film } from 'src/films/entities/film.entity';
import { ImagesModule } from 'src/images/images.module';
import { Image } from 'src/images/entities/image.entity';
import { Specie } from 'src/species/entities/specie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planet, Person, Film, Image, Specie]),
    ImagesModule
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService],
  exports: [PlanetsService]
})
export class PlanetsModule {}
