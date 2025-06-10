
import { DataSource } from "typeorm"
import 'dotenv/config'
import { User } from "../entities/User"
import { Product } from "../entities/Product"
import { Address } from "../entities/Address"
import { Coupon } from "../entities/Coupon"
import { Order } from "../entities/Order"
import { OrderItem } from "../entities/OrderItem"
import { OrderStatus } from "../entities/OrderStatus"
import { PaymentMethod } from "../entities/PaymentMethod"
import { Permissions } from "../entities/Permissions"

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