import { Film } from 'src/films/entities/film.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Specie } from 'src/species/entities/specie.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Image } from 'src/images/entities/image.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: string;

  @Column()
  gender: string;

  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @Column()
  url: string;

  @ManyToOne(() => Planet, (planet) => planet.residents)
  homeworld: Planet;

  @ManyToMany(() => Film, (film) => film.characters)
  films: Film[];

  @ManyToMany(() => Specie, (specie) => specie.people)
  @JoinTable()
  species: Specie[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots)
  @JoinTable()
  vehicles: Vehicle[];

  @ManyToMany(() => Starship, (starship) => starship.pilots)
  @JoinTable()
  starships: Starship[];

  @OneToMany(() => Image, (image) => image.person)
  images?: Image[];
}
