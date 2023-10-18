import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { SWAPI_URL } from 'src/common/constants';
import { relLinksToIDs } from 'src/common/get.relation.from.url';
import { Specie } from 'src/species/entities/specie.entity';
import { Repository } from 'typeorm';

interface swapiResponse {
  data: {
    next: string | null;
    results: {
      people: string[];
      films: string[];
      homeworld: string | null;
      created?: Date;
      edited?: Date;
    }[];
  };
}

@Injectable()
export class SpeciesSeederService {
  constructor(
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>
  ) {}

  async fillSpecies() {
    let i = 1;
    let isNotEnd = true;
    try {
      do {
        let { next, results } = (
          await axios.get<any, swapiResponse>(
            SWAPI_URL + 'species/?page=' + i++
          )
        ).data;
        await Promise.all(
          results.map(async (dto) => {
            dto.films = relLinksToIDs(dto.films);
            dto.people = relLinksToIDs(dto.people);
            dto.homeworld =
              relLinksToIDs([dto.homeworld ? dto.homeworld : ''])[0] || null;
            delete dto.created;
            delete dto.edited;
            const specie: Specie = plainToInstance(Specie, dto);
            return await this.speciesRepository.save(specie);
          })
        );
        isNotEnd = !!next;
      } while (isNotEnd);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during seeding species'
      );
    }
  }

  async clearSpecies() {
    try {
      await this.speciesRepository.query('DELETE FROM specie;');
      await this.speciesRepository.query(
        'ALTER TABLE specie AUTO_INCREMENT = 1;'
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during clearing species'
      );
    }
  }
}
