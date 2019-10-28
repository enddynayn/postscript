import { queues } from './queues';
import convict from '../config';
import transactionSynchronizerJob from './jobs/transactionSynchronizerJob';
import blockSynchronizerJob from './jobs/blockSynchronizerJob';
import transactionCollectionSynchronizerJob from './jobs/transactionCollectionSynchronizerJob';

const { COLLECTION, BLOCKS, TRANSACTIONS } = queues;

TRANSACTIONS.process(
  async (job, done) => await transactionSynchronizerJob(job, done)
);

TRANSACTIONS.on('completed', job => {
  console.log(`synchronized transaction with id: ${job.data.transactionId}`);
});

TRANSACTIONS.on('failed', (job, err) => {
  console.log(
    'job failed with transaction: ' +
      job.data.transactionId +
      ' with err: ' +
      err
  );
});

COLLECTION.process(
  async (_, done) => await transactionCollectionSynchronizerJob(_, done)
);

COLLECTION.on('completed', (job, _) => {
  console.log('collection sycn complete');
});

COLLECTION.on('failed', (_, err) => {
  console.log('collection sycn failed: ' + ' with err: ' + err);
});

BLOCKS.process(async (job, done) => blockSynchronizerJob(job, done));

BLOCKS.on('completed', (job, _) => {
  console.log(`synchronized block with block-height: ${job.data.blockHeight}`);
});

BLOCKS.on('failed', async (job, err) => {
  if (err.message.includes('-8 Block height out of range')) {
    console.log(
      `retrying ${job.data.blockHeight} job because block is not mined yet`
    );
    BLOCKS.add({ blockHeight: job.data.blockHeight }, { delay: 200000 });
    await job.moveToCompleted();
  } else {
    done(new Error(e));
    console.log(
      'job failed with block-height: ' +
        job.data.blockHeight +
        ' with err: ' +
        err
    );
  }
});

BLOCKS.add(
  { blockHeight: convict.get('bitcoin.synchronize.start') },
  { attempts: 20, backoff: { type: 'exponential', delay: 5000 } }
);

COLLECTION.add({}, { repeat: { cron: '* * * * *' } });
