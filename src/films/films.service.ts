import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { ImagesService } from 'src/images/images.service';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Specie } from 'src/species/entities/specie.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { In, Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { Image } from 'src/images/entities/image.entity';
import { ITEMS_PER_PAGE, SORT_ORDER } from 'src/common/constants';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>,
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private imagesService: ImagesService
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const film: Film = plainToInstance(Film, createFilmDto);
    await this.getRelations(film, createFilmDto);
    return await this.filmsRepository.save(film);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(query, this.filmsRepository, {
      sortableColumns: ['id'],
      defaultSortBy: [['id', SORT_ORDER]],
      defaultLimit: ITEMS_PER_PAGE,
      relations: {
        characters: true,
        planets: true,
        species: true,
        vehicles: true,
        starships: true,
        images: true
      }
    });
  }

  async findOne(id: number) {
    const film = await this.filmsRepository.findOne({
      where: { id },
      relations: {
        characters: true,
        planets: true,
        species: true,
        vehicles: true,
        starships: true,
        images: true
      }
    });
    if (!film)
      throw new BadRequestException(`Film with ID = ${id} does not exists`);
    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    let film = await this.findOne(id);
    const updFilm: Partial<Film> = plainToInstance(Film, updateFilmDto);
    film = { ...film, ...updFilm };
    await this.getRelations(film, updateFilmDto);
    return await this.filmsRepository.save(film);
  }

  async remove(id: number) {
    const film = await this.findOne(id);
    const filmImages = film.images?.map((img) => img.id);
    if (filmImages)
      await Promise.all(
        filmImages.map(
          async (id) => await this.imagesService.deleteImageByID(id)
        )
      );
    return await this.filmsRepository.remove(film);
  }

  async addImage(id: number, files: Express.Multer.File[]) {
    const film = await this.findOne(id);
    const img = new Image();
    img.film = film;
    return this.imagesService.saveImage(img, files);
  }

  async deleteImageByID(id: number) {
    return await this.imagesService.deleteImageByID(id);
  }

  async getRelations(
    film: Partial<Film>,
    createFilmDto: Partial<CreateFilmDto>
  ): Promise<void> {
    film.characters = createFilmDto.characters
      ? await this.peopleRepository.find({
          where: { id: In(createFilmDto.characters) }
        })
      : [];
    film.species = createFilmDto.species
      ? await this.speciesRepository.find({
          where: { id: In(createFilmDto.species) }
        })
      : [];
    film.starships = createFilmDto.starships
      ? await this.starshipsRepository.find({
          where: { id: In(createFilmDto.starships) }
        })
      : [];
    film.vehicles = createFilmDto.vehicles
      ? await this.vehiclesRepository.find({
          where: { id: In(createFilmDto.vehicles) }
        })
      : [];
    film.planets = createFilmDto.planets
      ? await this.planetsRepository.find({
          where: { id: In(createFilmDto.planets) }
        })
      : [];
    film.images = createFilmDto.images
      ? await this.imagesRepository.find({
          where: { id: In(createFilmDto.images) }
        })
      : [];
  }
}
