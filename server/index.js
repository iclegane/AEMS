const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const errorMiddleware = require('./src/middlewares/ErrorMiddleware');
const router = require('./src/router/index');


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

mongoose.set('strictQuery', false);

const server = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`);
        });
    } catch(e) {
        console.log(e);
    }
};

server();
