import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import healthRouter from './routes/health';
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/health', healthRouter);
app.use('/users', usersRouter);

export default app;
