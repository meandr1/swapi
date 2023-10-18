import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';
import { Specie } from './entities/specie.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/people/entities/person.entity';
import { Film } from 'src/films/entities/film.entity';
import { ImagesService } from 'src/images/images.service';
import { plainToInstance } from 'class-transformer';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { Image } from 'src/images/entities/image.entity';
import { ITEMS_PER_PAGE, SORT_ORDER } from 'src/common/constants';
import { PlanetsService } from 'src/planets/planets.service';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private imagesService: ImagesService,
    private planetsService: PlanetsService
  ) {}

  async create(createSpecieDto: CreateSpecieDto) {
    const specie: Specie = plainToInstance(Specie, createSpecieDto);
    await this.getRelations(specie, createSpecieDto);
    await this.planetsService.findOne(createSpecieDto.homeworld);
    return await this.speciesRepository.save(specie);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(query, this.speciesRepository, {
      sortableColumns: ['id'],
      defaultSortBy: [['id', SORT_ORDER]],
      defaultLimit: ITEMS_PER_PAGE,
      relations: {
        people: true,
        films: true,
        images: true
      }
    });
  }

  async findOne(id: number) {
    const specie = await this.speciesRepository.findOne({
      where: { id },
      relations: {
        people: true,
        films: true,
        images: true
      }
    });
    if (!specie)
      throw new BadRequestException(`Specie with ID = ${id} does not exists`);
    return specie;
  }

  async update(id: number, updateSpecieDto: UpdateSpecieDto) {
    let specie = await this.findOne(id);
    const updSpecie: Partial<Specie> = plainToInstance(Specie, updateSpecieDto);
    specie = { ...specie, ...updSpecie };
    await this.getRelations(specie, updateSpecieDto);
    return await this.speciesRepository.save(specie);
  }

  async remove(id: number) {
    const specie = await this.findOne(id);
    const specieImages = specie.images?.map((img) => img.id);
    if (specieImages)
      await Promise.all(
        specieImages.map(
          async (id) => await this.imagesService.deleteImageByID(id)
        )
      );
    return await this.speciesRepository.remove(specie);
  }

  async addImage(id: number, files: Express.Multer.File[]) {
    const specie = await this.findOne(id);
    const img = new Image();
    img.specie = specie;
    return await this.imagesService.saveImage(img, files);
  }

  async deleteImageByID(id: number) {
    return await this.imagesService.deleteImageByID(id);
  }

  async getRelations(
    specie: Partial<Specie>,
    createSpecieDto: Partial<CreateSpecieDto>
  ): Promise<void> {
    specie.films = createSpecieDto.films
      ? await this.filmsRepository.find({
          where: { id: In(createSpecieDto.films) }
        })
      : [];
    specie.people = createSpecieDto.people
      ? await this.peopleRepository.find({
          where: { id: In(createSpecieDto.people) }
        })
      : [];
    specie.images = createSpecieDto.images
      ? await this.imagesRepository.find({
          where: { id: In(createSpecieDto.images) }
        })
      : [];
  }
}
