import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { SWAPI_URL } from 'src/common/constants';
import { relLinksToIDs } from 'src/common/get.relation.from.url';
import { Planet } from 'src/planets/entities/planet.entity';
import { Repository } from 'typeorm';

interface swapiResponse {
  data: {
    next: string | null;
    results: {
      residents: string[];
      films: string[];
      created?: Date;
      edited?: Date;
    }[];
  };
}

@Injectable()
export class PlanetsSeederService {
  constructor(
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>
  ) {}

  async fillPlanets() {
    let i = 1;
    let isNotEnd = true;
    try {
      do {
        let { next, results } = (
          await axios.get<any, swapiResponse>(
            SWAPI_URL + 'planets/?page=' + i++
          )
        ).data;
        await Promise.all(
          results.map(async (dto) => {
            dto.films = relLinksToIDs(dto.films);
            dto.residents = relLinksToIDs(dto.residents);
            delete dto.created;
            delete dto.edited;
            const planet: Planet = plainToInstance(Planet, dto);
            return await this.planetsRepository.save(planet);
          })
        );
        isNotEnd = !!next;
      } while (isNotEnd);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during seeding planets'
      );
    }
  }

  async clearPlanets() {
    try {
      await this.planetsRepository.query('DELETE FROM planet;');
      await this.planetsRepository.query(
        'ALTER TABLE planet AUTO_INCREMENT = 1;'
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during clearing planets'
      );
    }
  }
}
