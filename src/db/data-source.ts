
import { DataSource } from "typeorm"
import 'dotenv/config'
import { User } from "../domain/entities/User"
import { Product } from "../domain/entities/Product"
import { Address } from "../domain/entities/Address"
import { Coupon } from "../domain/entities/Coupon"
import { Order } from "../domain/entities/Order"
import { OrderItem } from "../domain/entities/OrderItem"
import { OrderStatus } from "../domain/entities/OrderStatus"
import { PaymentMethod } from "../domain/entities/PaymentMethod"
import { Permissions } from "../domain/entities/Permissions"

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
        Address,
        Coupon,
        Order,
        OrderItem,
        OrderStatus,
        PaymentMethod,
        Permissions
    ],
    subscribers: [],
    migrations: [],
})