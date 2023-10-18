import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
  BadRequestException,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageFilterOptions } from 'src/images/image.filter';
import { ExtendedRequest } from 'src/common/request.interface';
import { FILE_TYPES_STR } from 'src/common/constants';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';
import { RolesGuard } from 'src/role/roles.guard';

@ApiTags('people')
@Controller('people')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createPersonDto: CreatePersonDto) {
    return await this.peopleService.create(createPersonDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.peopleService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.peopleService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonDto: UpdatePersonDto
  ) {
    return await this.peopleService.update(id, updatePersonDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.peopleService.remove(id);
  }

  @Post('image/:id')
  @Roles(Role.Admin)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateImageDto })
  @UseInterceptors(FilesInterceptor('files', 10, imageFilterOptions))
  async uploadImage(
    @Req() req: ExtendedRequest,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number
  ) {
    if (req?.fileValidationError === 'UNSUPPORTED_FILE_TYPE') {
      throw new BadRequestException(
        `Only ${FILE_TYPES_STR} file types are supported`
      );
    }
    return await this.peopleService.addImage(id, files);
  }

  @Delete('image/:id')
  @Roles(Role.Admin)
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    return await this.peopleService.deleteImageByID(id);
  }
}
