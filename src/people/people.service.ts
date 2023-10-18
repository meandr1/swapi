import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { plainToInstance } from 'class-transformer';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { ImagesService } from 'src/images/images.service';
import { Image } from 'src/images/entities/image.entity';
import { Film } from 'src/films/entities/film.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Specie } from 'src/species/entities/specie.entity';
import { ITEMS_PER_PAGE, SORT_ORDER } from 'src/common/constants';
import { PlanetsService } from 'src/planets/planets.service';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>,
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private imagesService: ImagesService,
    private planetsService: PlanetsService
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const person: Person = plainToInstance(Person, createPersonDto);
    await this.getRelations(person, createPersonDto);
    await this.planetsService.findOne(createPersonDto.homeworld);
    return await this.peopleRepository.save(person);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(query, this.peopleRepository, {
      sortableColumns: ['id'],
      defaultSortBy: [['id', SORT_ORDER]],
      defaultLimit: ITEMS_PER_PAGE,
      relations: {
        homeworld: true,
        films: true,
        species: true,
        vehicles: true,
        starships: true,
        images: true
      }
    });
  }

  async findOne(id: number) {
    const person = await this.peopleRepository.findOne({
      where: { id },
      relations: {
        homeworld: true,
        films: true,
        species: true,
        vehicles: true,
        starships: true,
        images: true
      }
    });
    if (!person)
      throw new BadRequestException(`Person with ID = ${id} does not exists`);
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    let person = await this.findOne(id);
    const updPerson: Partial<Person> = plainToInstance(Person, updatePersonDto);
    person = { ...person, ...updPerson };
    await this.getRelations(person, updatePersonDto);
    return await this.peopleRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.findOne(id);
    const personImages = person.images?.map((img) => img.id);
    if (personImages)
      await Promise.all(
        personImages.map(
          async (id) => await this.imagesService.deleteImageByID(id)
        )
      );
    return await this.peopleRepository.remove(person);
  }

  async addImage(id: number, files: Express.Multer.File[]) {
    const person = await this.findOne(id);
    const img = new Image();
    img.person = person;
    return await this.imagesService.saveImage(img, files);
  }

  async deleteImageByID(id: number) {
    return await this.imagesService.deleteImageByID(id);
  }

  async getRelations(
    person: Partial<Person>,
    createPersonDto: Partial<CreatePersonDto>
  ): Promise<void> {
    person.films = createPersonDto.films
      ? await this.filmsRepository.find({
          where: { id: In(createPersonDto.films) }
        })
      : [];
    person.species = createPersonDto.species
      ? await this.speciesRepository.find({
          where: { id: In(createPersonDto.species) }
        })
      : [];
    person.starships = createPersonDto.starships
      ? await this.starshipsRepository.find({
          where: { id: In(createPersonDto.starships) }
        })
      : [];
    person.vehicles = createPersonDto.vehicles
      ? await this.vehiclesRepository.find({
          where: { id: In(createPersonDto.vehicles) }
        })
      : [];
    person.images = createPersonDto.images
      ? await this.imagesRepository.find({
          where: { id: In(createPersonDto.images) }
        })
      : [];
  }
}
