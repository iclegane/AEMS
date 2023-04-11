import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import {Server as HttpServer} from 'http';
import {Server as SocketServer, Socket} from 'socket.io';
import errorMiddleware from './middlewares/ErrorMiddleware.js';
import router from './router/index.js';


dotenv.config({ path: './.env' });

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer, {
    cors: corsOptions
});


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api', router);
app.use(errorMiddleware);


const start = async () => {

    if (!process.env.DB_URL) {
        throw new Error('DB_URL environment variable not set');
    }

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URL);

        io.on('connection', (socket: Socket) => {
            socket.on('joinRoom', async (roomName: string) => {
                try {
                    if (!socket.rooms.has(roomName)) {
                        await socket.join(roomName);
                    }
                } catch (e) {
                    console.log(e);
                }
            });

            socket.on('disconnect', () => {
                socket.disconnect();
            });
        });

        httpServer.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`);
        });
    } catch(error) {
        console.log(error);
    }
};

await start();

export default io;
