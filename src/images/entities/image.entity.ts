import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Specie } from 'src/species/entities/specie.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Film, (film) => film.images, { onDelete: 'CASCADE' })
  film?: Film;

  @ManyToOne(() => Person, (person) => person.images, { onDelete: 'CASCADE' })
  person?: Person;

  @ManyToOne(() => Planet, (planet) => planet.images, { onDelete: 'CASCADE' })
  planet?: Planet;

  @ManyToOne(() => Specie, (specie) => specie.images, { onDelete: 'CASCADE' })
  specie?: Specie;

  @ManyToOne(() => Starship, (starship) => starship.images, {
    onDelete: 'CASCADE'
  })
  starship?: Starship;

  @ManyToOne(() => Vehicle, (specie) => specie.images, { onDelete: 'CASCADE' })
  vehicle?: Vehicle;
}
