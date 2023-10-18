import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/people/entities/person.entity';
import { FindOneOptions, In, Repository } from 'typeorm';
import { Film } from 'src/films/entities/film.entity';
import { ImagesService } from 'src/images/images.service';
import { plainToInstance } from 'class-transformer';
import { Planet } from './entities/planet.entity';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { Image } from 'src/images/entities/image.entity';
import { ITEMS_PER_PAGE, SORT_ORDER } from 'src/common/constants';
import { Specie } from 'src/species/entities/specie.entity';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private imagesService: ImagesService
  ) {}

  async create(createPlanetDto: CreatePlanetDto) {
    const planet: Planet = plainToInstance(Planet, createPlanetDto);
    await this.getRelations(planet, createPlanetDto);
    return await this.planetsRepository.save(planet);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(query, this.planetsRepository, {
      sortableColumns: ['id'],
      defaultSortBy: [['id', SORT_ORDER]],
      defaultLimit: ITEMS_PER_PAGE,
      relations: {
        residents: true,
        films: true,
        images: true
      }
    });
  }

  async findOne(id: number) {
    const planet = await this.planetsRepository.findOne({
      where: { id },
      relations: {
        residents: true,
        films: true,
        images: true
      }
    });
    if (!planet)
      throw new BadRequestException(`Planet with ID = ${id} does not exists`);
    return planet;
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    let planet = await this.findOne(id);
    const updPlanet: Partial<Planet> = plainToInstance(Planet, updatePlanetDto);
    planet = { ...planet, ...updPlanet };
    await this.getRelations(planet, updatePlanetDto);
    return await this.planetsRepository.save(planet);
  }

  async remove(id: number) {
    const planet = await this.findOne(id);
    await this.checkRelatedEntities(planet);
    const planetImages = planet.images?.map((img) => img.id);
    if (planetImages)
      await Promise.all(
        planetImages.map(
          async (id) => await this.imagesService.deleteImageByID(id)
        )
      );
    return await this.planetsRepository.remove(planet);
  }

  async addImage(id: number, files: Express.Multer.File[]) {
    const planet = await this.findOne(id);
    const img = new Image();
    img.planet = planet;
    return await this.imagesService.saveImage(img, files);
  }

  async deleteImageByID(id: number) {
    return await this.imagesService.deleteImageByID(id);
  }

  async getRelations(
    planet: Partial<Planet>,
    createPlanetDto: Partial<CreatePlanetDto>
  ): Promise<void> {
    planet.films = createPlanetDto.films
      ? await this.filmsRepository.find({
          where: { id: In(createPlanetDto.films) }
        })
      : [];
    planet.residents = createPlanetDto.residents
      ? await this.peopleRepository.find({
          where: { id: In(createPlanetDto.residents) }
        })
      : [];
    planet.images = createPlanetDto.images
      ? await this.imagesRepository.find({
          where: { id: In(createPlanetDto.images) }
        })
      : [];
  }

  async checkRelatedEntities(planet: Planet) {
    const findOptions: FindOneOptions = { where: { homeworld: planet.id } };
    const relatedPeople = await this.peopleRepository.findOne(findOptions);
    const relatedSpecies = await this.speciesRepository.findOne(findOptions);
    if (relatedPeople || relatedSpecies)
      throw new BadRequestException(
        `Can't delete planet with ID = ${planet.id} because some ${
          relatedPeople && relatedSpecies
            ? 'People and Specie'
            : relatedPeople
            ? 'People'
            : 'Specie'
        } entities owns it as home world`
      );
  }
}
