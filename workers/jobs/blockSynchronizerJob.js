import synchronizeBlock from '../../services/synchronizeBlock';
import models from '../../models';
import { queues } from '../queues';
const { BLOCKS } = queues;
const { BlockInfo } = models;

async function blockSynchronizerJob(job, done) {
  const {
    data: { blockHeight },
  } = job;

  const blocks = await BlockInfo.findAll({
    where: {
      height: blockHeight,
    },
  });

  if (blocks.length != 0) {
    return done();
  }

  let newBlock;
  try {
    newBlock = await synchronizeBlock(blockHeight);
    BLOCKS.add(
      { blockHeight: blockHeight + 1 },
      { attempts: 20, backoff: { type: 'exponential', delay: 5000 } }
    );
    done();
  } catch (e) {
    done(new Error(e));
  }
}

export default blockSynchronizerJob;
