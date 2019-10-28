import fetchBlock from './fetchBlock';
import models from '../models';
const { BlockInfo, Transaction } = models;

async function synchronizeBlock(blockHeight) {
  const block = await fetchBlock(blockHeight);

  return await BlockInfo.create(
    {
      height: blockHeight,
      hash: block.hash,
      time: block.time,
      transactions: block.tx.map(t => {
        return {
          hash: t,
        };
      }),
    },
    { include: [{ model: Transaction, as: 'transactions' }] }
  );
}

export default synchronizeBlock;
