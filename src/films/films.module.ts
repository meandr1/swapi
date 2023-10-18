import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film } from './entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from 'src/images/images.module';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Specie } from 'src/species/entities/specie.entity';
import { Image } from 'src/images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Film,
      Person,
      Planet,
      Starship,
      Vehicle,
      Specie,
      Image
    ]),
    ImagesModule
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService]
})
export class FilmsModule {}
