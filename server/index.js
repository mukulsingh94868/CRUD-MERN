import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/userRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

app.use('/api', route);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => {
    console.log('DB connection established');

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    })
}).catch((error) => console.log(error));