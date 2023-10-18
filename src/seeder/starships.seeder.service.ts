import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { SWAPI_URL } from 'src/common/constants';
import { relLinksToIDs } from 'src/common/get.relation.from.url';
import { Starship } from 'src/starships/entities/starship.entity';
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
export class StarshipsSeederService {
  constructor(
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>
  ) {}

  async fillStarships() {
    let i = 1;
    let isNotEnd = true;
    try {
      do {
        let { next, results } = (
          await axios.get<any, swapiResponse>(
            SWAPI_URL + 'starships/?page=' + i++
          )
        ).data;
        await Promise.all(
          results.map(async (dto) => {
            dto.films = relLinksToIDs(dto.films);
            dto.pilots = relLinksToIDs(dto.pilots);
            delete dto.created;
            delete dto.edited;
            const starship: Starship = plainToInstance(Starship, dto);
            return await this.starshipsRepository.save(starship);
          })
        );
        isNotEnd = !!next;
      } while (isNotEnd);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during seeding starships'
      );
    }
  }

  async clearStarships() {
    try {
      await this.starshipsRepository.query('DELETE FROM starship;');
      await this.starshipsRepository.query(
        'ALTER TABLE starship AUTO_INCREMENT = 1;'
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during clearing films'
      );
    }
  }
}
