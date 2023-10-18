import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Image } from 'src/images/entities/image.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { Planet } from 'src/planets/entities/planet.entity';

@Entity()
export class Specie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  skin_colors: string;

  @Column()
  hair_colors: string;

  @Column()
  eye_colors: string;

  @Column()
  average_lifespan: string;

  @ManyToOne(() => Planet)
  homeworld: Planet;

  @Column()
  language: string;

  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @Column()
  url: string;

  @ManyToMany(() => Person, (person) => person.species)
  people?: Person[];

  @ManyToMany(() => Film, (film) => film.species)
  films?: Film[];

  @OneToMany(() => Image, (image) => image.specie)
  images?: Image[];
}
