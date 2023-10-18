import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  rotation_period: string;

  @ApiProperty()
  @IsString()
  orbital_period: string;

  @ApiProperty()
  @IsString()
  diameter: string;

  @ApiProperty()
  @IsString()
  climate: string;

  @ApiProperty()
  @IsString()
  gravity: string;

  @ApiProperty()
  @IsString()
  terrain: string;

  @ApiProperty()
  @IsString()
  surface_water: string;

  @ApiProperty()
  @IsString()
  population: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  residents?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  films?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  images?: number[];
}
