import { Image } from 'src/images/entities/image.entity';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Specie } from 'src/species/entities/specie.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column('text')
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @Column()
  url: string;

  @ManyToMany(() => Person, (person) => person.films)
  @JoinTable()
  characters?: Person[];

  @ManyToMany(() => Planet, (planet) => planet.films)
  @JoinTable()
  planets?: Planet[];

  @ManyToMany(() => Starship, (starship) => starship.films)
  @JoinTable()
  starships?: Starship[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films)
  @JoinTable()
  vehicles?: Vehicle[];

  @ManyToMany(() => Specie, (specie) => specie.films)
  @JoinTable()
  species?: Specie[];

  @OneToMany(() => Image, (image) => image.film)
  images?: Image[];
}
