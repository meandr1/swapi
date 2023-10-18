import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1684604483225 implements MigrationInterface {
  name = 'CreateTables1684604483225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`planet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`specie\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, \`homeworldId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`starship\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, \`homeworldId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`filmId\` int NULL, \`personId\` int NULL, \`planetId\` int NULL, \`specieId\` int NULL, \`starshipId\` int NULL, \`vehicleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`film\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`episode_id\` int NOT NULL, \`opening_crawl\` text NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`pass\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`person_species_specie\` (\`personId\` int NOT NULL, \`specieId\` int NOT NULL, INDEX \`IDX_10f5e82ddc0e1f67f779f37c21\` (\`personId\`), INDEX \`IDX_768ccc6a23ed03f3e4fc27cd83\` (\`specieId\`), PRIMARY KEY (\`personId\`, \`specieId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`person_vehicles_vehicle\` (\`personId\` int NOT NULL, \`vehicleId\` int NOT NULL, INDEX \`IDX_93eb9aed40f347d6d9eb37af39\` (\`personId\`), INDEX \`IDX_dcca73435d3a911aec3a8c6a8e\` (\`vehicleId\`), PRIMARY KEY (\`personId\`, \`vehicleId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`person_starships_starship\` (\`personId\` int NOT NULL, \`starshipId\` int NOT NULL, INDEX \`IDX_5b4b4623267b28750ae11a5309\` (\`personId\`), INDEX \`IDX_18aaf7b5a5268c1d99b1385adf\` (\`starshipId\`), PRIMARY KEY (\`personId\`, \`starshipId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`film_characters_person\` (\`filmId\` int NOT NULL, \`personId\` int NOT NULL, INDEX \`IDX_7c9df9a723ecdbadcfe8362646\` (\`filmId\`), INDEX \`IDX_76a39805866b99358326c6153a\` (\`personId\`), PRIMARY KEY (\`filmId\`, \`personId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`film_planets_planet\` (\`filmId\` int NOT NULL, \`planetId\` int NOT NULL, INDEX \`IDX_9e9d858b064b7d0fa02a9764e1\` (\`filmId\`), INDEX \`IDX_6821d91826ca31cc4e4588b535\` (\`planetId\`), PRIMARY KEY (\`filmId\`, \`planetId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`film_starships_starship\` (\`filmId\` int NOT NULL, \`starshipId\` int NOT NULL, INDEX \`IDX_ed79253745f81534b737ce768c\` (\`filmId\`), INDEX \`IDX_21297c5d74a841542bcb7fe063\` (\`starshipId\`), PRIMARY KEY (\`filmId\`, \`starshipId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`film_vehicles_vehicle\` (\`filmId\` int NOT NULL, \`vehicleId\` int NOT NULL, INDEX \`IDX_af46f6d0bef8eba92546a8c537\` (\`filmId\`), INDEX \`IDX_8be4e7e1014359bb4715338cf2\` (\`vehicleId\`), PRIMARY KEY (\`filmId\`, \`vehicleId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`film_species_specie\` (\`filmId\` int NOT NULL, \`specieId\` int NOT NULL, INDEX \`IDX_57e6df74dce55bd710f01c44bb\` (\`filmId\`), INDEX \`IDX_5a19d397f578506a444ad76cfa\` (\`specieId\`), PRIMARY KEY (\`filmId\`, \`specieId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`specie\` ADD CONSTRAINT \`FK_55bd54b68d6b9484ec932556182\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_997edaa4b7b556c0d557cc6e1bb\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_bd8cc9c576f9525120aa5e1b058\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_89a43731e1ed10a765b76e161b8\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_282e5fa53a7b9a5c012c215c2ca\` FOREIGN KEY (\`planetId\`) REFERENCES \`planet\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_34cbc891357b2f1b84975048feb\` FOREIGN KEY (\`specieId\`) REFERENCES \`specie\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_c2424c9afe236559b8b806e227d\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starship\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_5f21c4268f97c67e2f05b27d427\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`person_species_specie\` ADD CONSTRAINT \`FK_10f5e82ddc0e1f67f779f37c21e\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`person_species_specie\` ADD CONSTRAINT \`FK_768ccc6a23ed03f3e4fc27cd839\` FOREIGN KEY (\`specieId\`) REFERENCES \`specie\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`person_vehicles_vehicle\` ADD CONSTRAINT \`FK_93eb9aed40f347d6d9eb37af39c\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`person_vehicles_vehicle\` ADD CONSTRAINT \`FK_dcca73435d3a911aec3a8c6a8eb\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`person_starships_starship\` ADD CONSTRAINT \`FK_5b4b4623267b28750ae11a53094\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`person_starships_starship\` ADD CONSTRAINT \`FK_18aaf7b5a5268c1d99b1385adf9\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starship\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` ADD CONSTRAINT \`FK_7c9df9a723ecdbadcfe83626467\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` ADD CONSTRAINT \`FK_76a39805866b99358326c6153a0\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`film_planets_planet\` ADD CONSTRAINT \`FK_9e9d858b064b7d0fa02a9764e18\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`film_planets_planet\` ADD CONSTRAINT \`FK_6821d91826ca31cc4e4588b5355\` FOREIGN KEY (\`planetId\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`film_starships_starship\` ADD CONSTRAINT \`FK_ed79253745f81534b737ce768c1\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`film_starships_starship\` ADD CONSTRAINT \`FK_21297c5d74a841542bcb7fe063a\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starship\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`film_vehicles_vehicle\` ADD CONSTRAINT \`FK_af46f6d0bef8eba92546a8c5375\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`film_vehicles_vehicle\` ADD CONSTRAINT \`FK_8be4e7e1014359bb4715338cf20\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`film_species_specie\` ADD CONSTRAINT \`FK_57e6df74dce55bd710f01c44bb8\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`film_species_specie\` ADD CONSTRAINT \`FK_5a19d397f578506a444ad76cfac\` FOREIGN KEY (\`specieId\`) REFERENCES \`specie\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`film_species_specie\` DROP FOREIGN KEY \`FK_5a19d397f578506a444ad76cfac\``
    );
    await queryRunner.query(
      `ALTER TABLE \`film_species_specie\` DROP FOREIGN KEY \`FK_57e6df74dce55bd710f01c44bb8\``
    );
    await queryRunner.query(
      `ALTER TABLE \`film_vehicles_vehicle\` DROP FOREIGN KEY \`FK_8be4e7e1014359bb4715338cf20\``
    );
    await queryRunner.query(
      `ALTER TABLE \`film_vehicles_vehicle\` DROP FOREIGN KEY \`FK_af46f6d0bef8eba92546a8c5375\``
    );
    await queryRunner.query(
      `ALTER TABLE \`film_starships_starship\` DROP FOREIGN KEY \`FK_21297c5d74a841542bcb7fe063a\``
    );
    await queryRunner.query(
      `ALTER TABLE \`film_starships_starship\` DROP FOREIGN KEY \`FK_ed79253745f81534b737ce768c1\``
    );
    await queryRunner.query(
      `ALTER TABLE \`film_planets_planet\` DROP FOREIGN KEY \`FK_6821d91826ca31cc4e4588b5355\``
    );
    await queryRunner.query(
      `ALTER TABLE \`film_planets_planet\` DROP FOREIGN KEY \`FK_9e9d858b064b7d0fa02a9764e18\``
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` DROP FOREIGN KEY \`FK_76a39805866b99358326c6153a0\``
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` DROP FOREIGN KEY \`FK_7c9df9a723ecdbadcfe83626467\``
    );
    await queryRunner.query(
      `ALTER TABLE \`person_starships_starship\` DROP FOREIGN KEY \`FK_18aaf7b5a5268c1d99b1385adf9\``
    );
    await queryRunner.query(
      `ALTER TABLE \`person_starships_starship\` DROP FOREIGN KEY \`FK_5b4b4623267b28750ae11a53094\``
    );
    await queryRunner.query(
      `ALTER TABLE \`person_vehicles_vehicle\` DROP FOREIGN KEY \`FK_dcca73435d3a911aec3a8c6a8eb\``
    );
    await queryRunner.query(
      `ALTER TABLE \`person_vehicles_vehicle\` DROP FOREIGN KEY \`FK_93eb9aed40f347d6d9eb37af39c\``
    );
    await queryRunner.query(
      `ALTER TABLE \`person_species_specie\` DROP FOREIGN KEY \`FK_768ccc6a23ed03f3e4fc27cd839\``
    );
    await queryRunner.query(
      `ALTER TABLE \`person_species_specie\` DROP FOREIGN KEY \`FK_10f5e82ddc0e1f67f779f37c21e\``
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_5f21c4268f97c67e2f05b27d427\``
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_c2424c9afe236559b8b806e227d\``
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_34cbc891357b2f1b84975048feb\``
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_282e5fa53a7b9a5c012c215c2ca\``
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_89a43731e1ed10a765b76e161b8\``
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_bd8cc9c576f9525120aa5e1b058\``
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_997edaa4b7b556c0d557cc6e1bb\``
    );
    await queryRunner.query(
      `ALTER TABLE \`specie\` DROP FOREIGN KEY \`FK_55bd54b68d6b9484ec932556182\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5a19d397f578506a444ad76cfa\` ON \`film_species_specie\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_57e6df74dce55bd710f01c44bb\` ON \`film_species_specie\``
    );
    await queryRunner.query(`DROP TABLE \`film_species_specie\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8be4e7e1014359bb4715338cf2\` ON \`film_vehicles_vehicle\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_af46f6d0bef8eba92546a8c537\` ON \`film_vehicles_vehicle\``
    );
    await queryRunner.query(`DROP TABLE \`film_vehicles_vehicle\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_21297c5d74a841542bcb7fe063\` ON \`film_starships_starship\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ed79253745f81534b737ce768c\` ON \`film_starships_starship\``
    );
    await queryRunner.query(`DROP TABLE \`film_starships_starship\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_6821d91826ca31cc4e4588b535\` ON \`film_planets_planet\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9e9d858b064b7d0fa02a9764e1\` ON \`film_planets_planet\``
    );
    await queryRunner.query(`DROP TABLE \`film_planets_planet\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_76a39805866b99358326c6153a\` ON \`film_characters_person\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7c9df9a723ecdbadcfe8362646\` ON \`film_characters_person\``
    );
    await queryRunner.query(`DROP TABLE \`film_characters_person\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_18aaf7b5a5268c1d99b1385adf\` ON \`person_starships_starship\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5b4b4623267b28750ae11a5309\` ON \`person_starships_starship\``
    );
    await queryRunner.query(`DROP TABLE \`person_starships_starship\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_dcca73435d3a911aec3a8c6a8e\` ON \`person_vehicles_vehicle\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_93eb9aed40f347d6d9eb37af39\` ON \`person_vehicles_vehicle\``
    );
    await queryRunner.query(`DROP TABLE \`person_vehicles_vehicle\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_768ccc6a23ed03f3e4fc27cd83\` ON \`person_species_specie\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_10f5e82ddc0e1f67f779f37c21\` ON \`person_species_specie\``
    );
    await queryRunner.query(`DROP TABLE \`person_species_specie\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`film\``);
    await queryRunner.query(`DROP TABLE \`image\``);
    await queryRunner.query(`DROP TABLE \`person\``);
    await queryRunner.query(`DROP TABLE \`vehicle\``);
    await queryRunner.query(`DROP TABLE \`starship\``);
    await queryRunner.query(`DROP TABLE \`specie\``);
    await queryRunner.query(`DROP TABLE \`planet\``);
  }
}
