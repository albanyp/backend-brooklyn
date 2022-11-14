import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { Movie } from "./entity/movie"
import { MovieFrancise } from "./entity/movie-franchise"
import { MovieType } from "./entity/movie-type"
import { User } from "./entity/user"

export const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "masterkey",
  database: "brooklyn",
  synchronize: false,
  logging: false,
  entities: [User, Movie, MovieType, MovieFrancise],
  subscribers: [],
}

export const AppDataSource = new DataSource({
  ...dbConfig,
  migrations: ['./src/migration/*.ts'],
})
