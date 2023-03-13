import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import errorMiddleware from './middlewares/ErrorMiddleware.js';
import router from './router/index.js';


dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);


const server = async () => {

    if (!process.env.DB_URL) {
        return;
    }

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URL);

        app.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`);
        });
    } catch(error) {
        console.log(error);
    }
};

await server();
