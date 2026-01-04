import express from 'express';
import dotenv from 'dotenv';
import { connectionDB } from './config/db';
import userRouter from './routes/userRoutes';

dotenv.config();

connectionDB();

const app = express();
app.use(express.json());

app.use('/api/users/', userRouter)

export default app;