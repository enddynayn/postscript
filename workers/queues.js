import Queue from 'bull';
import config from '../config';

export const BLOCKS = 'BLOCKS';
export const TRANSACTIONS = 'TRANSACTIONS';
export const COLLECTION = 'COLLECTION';

export const queues = {
  [BLOCKS]: new Queue(BLOCKS, config.get('redis.uri')),
  [TRANSACTIONS]: new Queue(TRANSACTIONS, config.get('redis.uri')),
  [COLLECTION]: new Queue(COLLECTION, config.get('redis.uri')),
};
