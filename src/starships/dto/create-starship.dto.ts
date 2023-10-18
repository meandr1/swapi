import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateStarshipDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @IsString()
  cost_in_credits: string;

  @ApiProperty()
  @IsString()
  length: string;

  @ApiProperty()
  @IsString()
  max_atmosphering_speed: string;

  @ApiProperty()
  @IsString()
  crew: string;

  @ApiProperty()
  @IsString()
  passengers: string;

  @ApiProperty()
  @IsString()
  cargo_capacity: string;

  @ApiProperty()
  @IsString()
  consumables: string;

  @ApiProperty()
  @IsString()
  hyperdrive_rating: string;

  @ApiProperty()
  @IsString()
  MGLT: string;

  @ApiProperty()
  @IsString()
  starship_class: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  pilots?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  films?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  images?: number[];
}
