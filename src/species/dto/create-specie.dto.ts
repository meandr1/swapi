import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSpecieDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  classification: string;

  @ApiProperty()
  @IsString()
  designation: string;

  @ApiProperty()
  @IsString()
  average_height: string;

  @ApiProperty()
  @IsString()
  skin_colors: string;

  @ApiProperty()
  @IsString()
  hair_colors: string;

  @ApiProperty()
  @IsString()
  eye_colors: string;

  @ApiProperty()
  @IsString()
  average_lifespan: string;

  @ApiProperty()
  @IsInt()
  homeworld: number;

  @ApiProperty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  people?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  films?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  images?: number[];
}
