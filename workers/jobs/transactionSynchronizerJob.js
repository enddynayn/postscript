import synchronizeTransaction from '../../services/synchronizeTransaction';

async function transactionSynchronizerJob(job, done) {
  try {
    await synchronizeTransaction(job.data.transactionId);
    done();
  } catch (e) {
    done(new Error(e));
  }
}

export default transactionSynchronizerJob;
