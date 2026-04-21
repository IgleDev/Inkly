import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { connectionDB } from './config/db';
import userRouter from './routes/userRoutes';
import blogRouter from './routes/blogRoutes';
import uploadRouter from './routes/uploadRoutes'; 

dotenv.config();

connectionDB();

const app = express();
app.use(express.json());
app.use(cors({origin : '*'}));

app.use('/api/users/', userRouter);
app.use('/api/blog/', blogRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));

export default app;