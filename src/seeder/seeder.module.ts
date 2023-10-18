import { Module } from '@nestjs/common';
import { PlanetsSeederService } from './planets.seeder.service';
import { SeederController } from './seeder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Specie } from 'src/species/entities/specie.entity';
import { FilmsModule } from 'src/films/films.module';
import { PeopleModule } from 'src/people/people.module';
import { SpeciesSeederService } from './species.seeder.service';
import { StarshipsSeederService } from './starships.seeder.service';
import { VehiclesSeederService } from './vehicles.seeder.service';
import { PeopleSeederService } from './people.seeder.service';
import { FilmsSeederService } from './films.seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film, Person, Planet, Starship, Vehicle, Specie]),
    PeopleModule,
    FilmsModule
  ],
  controllers: [SeederController],
  providers: [
    PlanetsSeederService,
    SpeciesSeederService,
    StarshipsSeederService,
    VehiclesSeederService,
    PeopleSeederService,
    FilmsSeederService
  ]
})
export class SeederModule {}
