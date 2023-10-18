import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  height: string;

  @ApiProperty()
  @IsString()
  mass: string;

  @ApiProperty()
  @IsString()
  hair_color: string;

  @ApiProperty()
  @IsString()
  skin_color: string;

  @ApiProperty()
  @IsString()
  eye_color: string;

  @ApiProperty()
  @IsString()
  birth_year: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsInt()
  homeworld: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  films?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  species?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  vehicles?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  starships?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  images?: number[];
}
