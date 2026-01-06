import express from 'express';
import dotenv from 'dotenv';
import { connectionDB } from './config/db';
import userRouter from './routes/userRoutes';
import cors from 'cors';

dotenv.config();

connectionDB();

const app = express();
app.use(express.json());
app.use(cors({origin : '*'}));

app.use('/api/users/', userRouter)

export default app;