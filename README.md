<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">This is an educational API like <a href="https://swapi.dev/" target="_blank">SWAPI</a> build on Nest.js framework</p>
   
## Description

All characters of [Star Wars](https://en.wikipedia.org/wiki/Star_Wars) saved in local MySQL storage

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Running migrations (Note: you should have database named 'swdb' on your local MySQL server)
$ npm run migration:run

# Starting APP
$ npm run start
```

## Test

```bash
# Seeding database from swapi.dev
Create POST request on http://localhost:3000/swagger#/seeder/

# Deleting seeded data from database
Create DELETE request on http://localhost:3000/swagger#/seeder/
```