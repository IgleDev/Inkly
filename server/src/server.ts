import express from 'express';
import dotenv from 'dotenv';
import { connectionDB } from './config/db';

dotenv.config();

connectionDB();

const app = express();
app.use(express.json());

export default app;