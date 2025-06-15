import  express  from "express";
import { AppDataSource } from "./db/data-source";
import cors from 'cors';
import { userRouter } from "./routes/UserRoutes";
import { addressRouter } from "./routes/addressRoutes";
import { productRouter } from "./routes/productRoutes";
import { categoryRouter } from "./routes/categoryController";
import { orderRouter } from "./routes/orderRoutes";
import { couponRouter } from "./routes/couponRoutes";
import ErrorHandler from "./middleware/ErrorHandle";
import { loginRouter } from "./routes/loginRoutes";

const app = express();

const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
       
        app.use(cors());
        app.use(express.json());
        app.use('/users', userRouter);
        app.use('/addresses', addressRouter);
        app.use('/products', productRouter);
        app.use('/categories', categoryRouter);
        app.use('/orders', orderRouter);
        app.use('/coupons', couponRouter);
        app.use('/login', loginRouter);

        app.use(ErrorHandler.handle())

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })