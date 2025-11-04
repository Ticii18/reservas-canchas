import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345",
  database: "futDB",
  synchronize: true,
  logging: false,
  entities: [User],
});