
import { DataSource } from "typeorm"
import 'dotenv/config'
import { User } from "../entities/User"
import { Product } from "../entities/Product"
import { Address } from "../entities/Address"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [
        User,
        Product,
        Address
    ],
    subscribers: [],
    migrations: [],
})