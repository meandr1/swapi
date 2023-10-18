import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { SWAPI_URL } from 'src/common/constants';
import { relLinksToIDs } from 'src/common/get.relation.from.url';
import { CreatePersonDto } from 'src/people/dto/create-person.dto';
import { Person } from 'src/people/entities/person.entity';
import { PeopleService } from 'src/people/people.service';
import { Repository } from 'typeorm';

interface swapiResponse {
  data: {
    next: string | null;
    results: {
      species: string[];
      vehicles: string[];
      starships: string[];
      films: string[];
      homeworld: string;
      created?: Date;
      edited?: Date;
    }[];
  };
}

@Injectable()
export class PeopleSeederService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    private peopleService: PeopleService
  ) {}

  async fillPeople() {
    let i = 1;
    let isNotEnd = true;
    try {
      do {
        let { next, results } = (
          await axios.get<any, swapiResponse>(SWAPI_URL + 'people/?page=' + i++)
        ).data;
        await Promise.all(
          results.map(async (dto) => {
            dto.films = relLinksToIDs(dto.films);
            dto.species = relLinksToIDs(dto.species);
            dto.vehicles = relLinksToIDs(dto.vehicles);
            dto.starships = relLinksToIDs(dto.starships);
            dto.homeworld = relLinksToIDs([
              dto.homeworld ? dto.homeworld : ''
            ])[0];
            delete dto.created;
            delete dto.edited;
            const person: Person = plainToInstance(Person, dto);
            const personDTO: CreatePersonDto = plainToInstance(
              CreatePersonDto,
              dto
            );
            await this.peopleService.getRelations(person, personDTO);
            return await this.peopleRepository.save(person);
          })
        );
        isNotEnd = !!next;
      } while (isNotEnd);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during seeding people'
      );
    }
  }

  async clearPeople() {
    try {
      await this.peopleRepository.query('DELETE FROM person;');
      await this.peopleRepository.query(
        'ALTER TABLE person AUTO_INCREMENT = 1;'
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Something goes wrong during clearing people'
      );
    }
  }
}
