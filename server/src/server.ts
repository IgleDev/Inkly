import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectionDB } from './config/db';
import userRouter from './routes/userRoutes';
import blogRouter from './routes/blogRoutes';

dotenv.config();

connectionDB();

const app = express();
app.use(express.json());
app.use(cors({origin : '*'}));

app.use('/api/users/', userRouter);
app.use('/api/blog/', blogRouter)

export default app;