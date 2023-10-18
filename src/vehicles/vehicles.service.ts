import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Person } from 'src/people/entities/person.entity';
import { Film } from 'src/films/entities/film.entity';
import { ImagesService } from 'src/images/images.service';
import { plainToInstance } from 'class-transformer';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { Image } from 'src/images/entities/image.entity';
import { ITEMS_PER_PAGE, SORT_ORDER } from 'src/common/constants';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private imagesService: ImagesService
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const vehicle: Vehicle = plainToInstance(Vehicle, createVehicleDto);
    await this.getRelations(vehicle, createVehicleDto);
    return await this.vehiclesRepository.save(vehicle);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(query, this.vehiclesRepository, {
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
    const vehicle = await this.vehiclesRepository.findOne({
      where: { id },
      relations: {
        pilots: true,
        films: true,
        images: true
      }
    });
    if (!vehicle)
      throw new BadRequestException(`Vehicle with ID = ${id} does not exists`);
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    let vehicle = await this.findOne(id);
    const updVehicle: Partial<Vehicle> = plainToInstance(
      Vehicle,
      updateVehicleDto
    );
    vehicle = { ...vehicle, ...updVehicle };
    await this.getRelations(vehicle, updateVehicleDto);
    return await this.vehiclesRepository.save(vehicle);
  }

  async remove(id: number) {
    const vehicle = await this.findOne(id);
    const vehicleImages = vehicle.images?.map((img) => img.id);
    if (vehicleImages)
      await Promise.all(
        vehicleImages.map(
          async (id) => await this.imagesService.deleteImageByID(id)
        )
      );
    return await this.vehiclesRepository.remove(vehicle);
  }

  async addImage(id: number, files: Express.Multer.File[]) {
    const vehicle = await this.findOne(id);
    const img = new Image();
    img.vehicle = vehicle;
    return await this.imagesService.saveImage(img, files);
  }

  async deleteImageByID(id: number) {
    return await this.imagesService.deleteImageByID(id);
  }

  async getRelations(
    vehicle: Partial<Vehicle>,
    createVehicleDto: Partial<CreateVehicleDto>
  ): Promise<void> {
    vehicle.films = createVehicleDto.films
      ? await this.filmsRepository.find({
          where: { id: In(createVehicleDto.films) }
        })
      : [];
    vehicle.pilots = createVehicleDto.pilots
      ? await this.peopleRepository.find({
          where: { id: In(createVehicleDto.pilots) }
        })
      : [];
    vehicle.images = createVehicleDto.images
      ? await this.imagesRepository.find({
          where: { id: In(createVehicleDto.images) }
        })
      : [];
  }
}
