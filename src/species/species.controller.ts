import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  Req,
  UploadedFiles,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageFilterOptions } from 'src/images/image.filter';
import { ExtendedRequest } from 'src/common/request.interface';
import { FILE_TYPES_STR } from 'src/common/constants';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';

@ApiTags('species')
@Controller('species')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createSpecieDto: CreateSpecieDto) {
    return await this.speciesService.create(createSpecieDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.speciesService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpecieDto: UpdateSpecieDto
  ) {
    return await this.speciesService.update(id, updateSpecieDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.speciesService.remove(id);
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
        `Only ${FILE_TYPES_STR} file types supported`
      );
    }
    return await this.speciesService.addImage(id, files);
  }

  @Delete('image/:id')
  @Roles(Role.Admin)
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    return await this.speciesService.deleteImageByID(id);
  }
}
