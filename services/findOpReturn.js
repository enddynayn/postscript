import bitcore from 'bitcore-lib';

function findOpReturn(rawTransaction) {
  const decoded = decode(rawTransaction);

  const opReturn = decoded['outputs'].find(
    output => output._scriptBuffer.slice(0, 1)[0] == 106
  );

  if (typeof opReturn == 'undefined') {
    return;
  }

  return opReturn._scriptBuffer;
}

function decode(rawTrasaction) {
  return new bitcore.Transaction(Buffer.from(rawTrasaction, 'hex'));
}

export default findOpReturn;
