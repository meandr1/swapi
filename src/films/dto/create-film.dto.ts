import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsInt()
  episode_id: number;

  @ApiProperty()
  @IsString()
  opening_crawl: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty()
  @IsString()
  producer: string;

  @ApiProperty()
  @IsString()
  release_date: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  characters?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  planets?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  starships?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  vehicles?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  species?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ each: true })
  images?: number[];
}
