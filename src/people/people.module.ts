import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { ImagesModule } from 'src/images/images.module';
import { Specie } from 'src/species/entities/specie.entity';
import { Film } from 'src/films/entities/film.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Image } from 'src/images/entities/image.entity';
import { PlanetsModule } from 'src/planets/planets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Film, Specie, Vehicle, Starship, Image]),
    ImagesModule,
    PlanetsModule
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [PeopleService]
})
export class PeopleModule {}
