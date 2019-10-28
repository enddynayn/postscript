import { queues } from '../queues';
import models from '../../models';
const { Transaction } = models;
const { TRANSACTIONS } = queues;

async function transactionCollectionSynchronizerJob(_, done) {
  try {
    const transactions = await Transaction.findAll({
      where: {
        status: 'pending',
      },
    });

    for (const transaction of transactions) {
      await transaction.update({ status: 'processing' });

      TRANSACTIONS.add(
        { transactionId: transaction.id },
        { attempts: 20, backoff: { type: 'exponential', delay: 5000 } }
      );
    }

    done();
  } catch (e) {
    done(new Error(e));
  }
}

export default transactionCollectionSynchronizerJob;
