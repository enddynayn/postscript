import fetchRawTransaction from './fetchRawTransaction';
import findOpReturn from './findOpReturn';
import decodeOpReturn from './decodeOpReturn';
import models from '../models';
const { sequelize, Transaction, OpReturn } = models;

async function synchronizeTransaction(transactionId) {
  if (!transactionId) {
    return;
  }

  let transaction = await Transaction.findOne({
    where: { id: transactionId },
  });

  const raw = await fetchRawTransaction(transaction.hash);

  const opReturn = findOpReturn(raw);

  let updateParams = {
    raw: raw,
    status: 'completed',
  };

  if (typeof opReturn != 'undefined') {
    let dbtransaction;
    try {
      dbtransaction = await sequelize.transaction();
      await OpReturn.create(
        {
          encode: opReturn.toString('base64'),
          text: decodeOpReturn(opReturn),
          blockInfoId: transaction.blockInfoId,
          transactionId: transaction.id,
        },
        { dbtransaction }
      );

      transaction = await transaction.update(updateParams, dbtransaction);
      await dbtransaction.commit();
      return transaction;
    } catch (e) {
      if (dbtransaction) await dbtransaction.rollback();
      throw new Error(e);
    }
  }

  return await transaction.update(updateParams);
}

export default synchronizeTransaction;
