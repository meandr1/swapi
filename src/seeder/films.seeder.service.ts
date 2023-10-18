import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { SWAPI_URL } from 'src/common/constants';
import { relLinksToIDs } from 'src/common/get.relation.from.url';
import { CreateFilmDto } from 'src/films/dto/create-film.dto';
import { Film } from 'src/films/entities/film.entity';
import { FilmsService } from 'src/films/films.service';
import { Repository } from 'typeorm';

interface swapiResponse {
  data: {
    next: string | null;
    results: {
      species: string[];
      vehicles: string[];
      starships: string[];
      characters: string[];
      planets: string[];
      created?: Date;
      edited?: Date;
    }[];
  };
}

@Injectable()
export class FilmsSeederService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    private filmsService: FilmsService
  ) {}

  async fillFilms() {
    let i = 1;
    let isNotEnd = true;
    try {
      do {
        let { next, results } = (
          await axios.get<any, swapiResponse>(SWAPI_URL + 'films/?page=' + i++)
        ).data;
        await Promise.all(
          results.map(async (dto) => {
            dto.characters = relLinksToIDs(dto.characters);
            dto.planets = relLinksToIDs(dto.planets);
            dto.species = relLinksToIDs(dto.species);
            dto.vehicles = relLinksToIDs(dto.vehicles);
            dto.starships = relLinksToIDs(dto.starships);
            delete dto.created;
            delete dto.edited;
            const film: Film = plainToInstance(Film, dto);
            const filmDTO: CreateFilmDto = plainToInstance(CreateFilmDto, dto);
            await this.filmsService.getRelations(film, filmDTO);
            return await this.filmsRepository.save(film);
          })
        );
        isNotEnd = !!next;
      } while (isNotEnd);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during seeding films'
      );
    }
  }

  async clearFilms() {
    try {
      await this.filmsRepository.query('DELETE FROM film;');
      await this.filmsRepository.query('ALTER TABLE film AUTO_INCREMENT = 1;');
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during clearing films'
      );
    }
  }
}
