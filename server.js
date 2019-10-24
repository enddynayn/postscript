import express from 'express';
import url from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import Arena from 'bull-arena';
import config from './config';

import { queues, NOTIFY_URL } from './queues';

import healthRouter from './routes/health';
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/health', healthRouter);
app.use('/users', usersRouter);

app.use(
  '/',
  Arena(
    {
      queues: [
        {
          name: NOTIFY_URL,
          hostId: 'Worker',
          redis: { uri: config.get('redis.uri') },
        },
      ],
    },
    {
      basePath: '/arena',
      disableListen: true,
    }
  )
);

export default app;
