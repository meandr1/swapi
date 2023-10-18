import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { SWAPI_URL } from 'src/common/constants';
import { relLinksToIDs } from 'src/common/get.relation.from.url';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Repository } from 'typeorm';

interface swapiResponse {
  data: {
    next: string | null;
    results: {
      pilots: string[];
      films: string[];
      created?: Date;
      edited?: Date;
    }[];
  };
}

@Injectable()
export class VehiclesSeederService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>
  ) {}

  async fillVehicles() {
    let i = 1;
    let isNotEnd = true;
    try {
      do {
        let { next, results } = (
          await axios.get<any, swapiResponse>(
            SWAPI_URL + 'vehicles/?page=' + i++
          )
        ).data;
        await Promise.all(
          results.map(async (dto) => {
            dto.films = relLinksToIDs(dto.films);
            dto.pilots = relLinksToIDs(dto.pilots);
            delete dto.created;
            delete dto.edited;
            const vehicle: Vehicle = plainToInstance(Vehicle, dto);
            return await this.vehiclesRepository.save(vehicle);
          })
        );
        isNotEnd = !!next;
      } while (isNotEnd);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during seeding vehicles'
      );
    }
  }

  async clearVehicles() {
    try {
      await this.vehiclesRepository.query('DELETE FROM vehicle;');
      await this.vehiclesRepository.query(
        'ALTER TABLE vehicle AUTO_INCREMENT = 1;'
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during clearing vehicles'
      );
    }
  }
}
