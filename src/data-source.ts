import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "./entity/User"

export const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "masterkey",
  database: "brooklyn",
  synchronize: false,
  logging: false,
  entities: [User],
  subscribers: [],
}

export const AppDataSource = new DataSource({
  ...dbConfig,
  migrations: ['./src/migration/*.ts'],
})
