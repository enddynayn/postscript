import express from 'express';
import logger from 'morgan';
import Arena from 'bull-arena';
import config from './config';

import { BLOCKS, COLLECTION, TRANSACTIONS } from './workers/queues';

import healthRouter from './routes/health';
import opReturnRouter from './routes/opReturn';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health', healthRouter);
app.use('/opreturn', opReturnRouter);

app.use(
  '/',
  Arena(
    {
      queues: [
        {
          name: BLOCKS,
          hostId: 'Blocks',
          redis: { uri: config.get('redis.uri') },
        },
        {
          name: TRANSACTIONS,
          hostId: 'Transactions',
          redis: { uri: config.get('redis.uri') },
        },
        {
          name: COLLECTION,
          hostId: 'Collection',
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
