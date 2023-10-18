import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starship } from './entities/starship.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/people/entities/person.entity';
import { Film } from 'src/films/entities/film.entity';
import { ImagesService } from 'src/images/images.service';
import { plainToInstance } from 'class-transformer';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { Image } from 'src/images/entities/image.entity';
import { ITEMS_PER_PAGE, SORT_ORDER } from 'src/common/constants';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private imagesService: ImagesService
  ) {}

  async create(createStarshipDto: CreateStarshipDto) {
    const starship: Starship = plainToInstance(Starship, createStarshipDto);
    await this.getRelations(starship, createStarshipDto);
    return await this.starshipsRepository.save(starship);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(query, this.starshipsRepository, {
      sortableColumns: ['id'],
      defaultSortBy: [['id', SORT_ORDER]],
      defaultLimit: ITEMS_PER_PAGE,
      relations: {
        pilots: true,
        films: true,
        images: true
      }
    });
  }

  async findOne(id: number) {
    const starship = await this.starshipsRepository.findOne({
      where: { id },
      relations: {
        pilots: true,
        films: true,
        images: true
      }
    });
    if (!starship)
      throw new BadRequestException(`Starship with ID = ${id} does not exists`);
    return starship;
  }

  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    let starship = await this.findOne(id);
    const updStarship: Partial<Starship> = plainToInstance(
      Starship,
      updateStarshipDto
    );
    starship = { ...starship, ...updStarship };
    await this.getRelations(starship, updateStarshipDto);
    return await this.starshipsRepository.save(starship);
  }

  async remove(id: number) {
    const starship = await this.findOne(id);
    const starshipImages = starship.images?.map((img) => img.id);
    if (starshipImages)
      await Promise.all(
        starshipImages.map(
          async (id) => await this.imagesService.deleteImageByID(id)
        )
      );
    return await this.starshipsRepository.remove(starship);
  }

  async addImage(id: number, files: Express.Multer.File[]) {
    const starship = await this.findOne(id);
    const img = new Image();
    img.starship = starship;
    return await this.imagesService.saveImage(img, files);
  }

  async deleteImageByID(id: number) {
    return await this.imagesService.deleteImageByID(id);
  }

  async getRelations(
    starship: Partial<Starship>,
    createStarshipDto: Partial<CreateStarshipDto>
  ): Promise<void> {
    starship.films = createStarshipDto.films
      ? await this.filmsRepository.find({
          where: { id: In(createStarshipDto.films) }
        })
      : [];
    starship.pilots = createStarshipDto.pilots
      ? await this.peopleRepository.find({
          where: { id: In(createStarshipDto.pilots) }
        })
      : [];
    starship.images = createStarshipDto.images
      ? await this.imagesRepository.find({
          where: { id: In(createStarshipDto.images) }
        })
      : [];
  }
}
