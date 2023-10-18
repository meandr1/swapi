import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './entities/specie.entity';
import { Person } from 'src/people/entities/person.entity';
import { Film } from 'src/films/entities/film.entity';
import { ImagesModule } from 'src/images/images.module';
import { Image } from 'src/images/entities/image.entity';
import { PlanetsModule } from 'src/planets/planets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Specie, Person, Film, Image]),
    ImagesModule,
    PlanetsModule
  ],
  controllers: [SpeciesController],
  providers: [SpeciesService],
  exports: [SpeciesService]
})
export class SpeciesModule {}
