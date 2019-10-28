import Client from 'bitcoin-core';
import convict from '../config';

async function fetchBlock(blockNumber) {
  const client = new Client({
    network: convict.get('bitcoin.client.network'),
    host: convict.get('bitcoin.client.host'),
    username: convict.get('bitcoin.client.username'),
    password: convict.get('bitcoin.client.password'),
    port: convict.get('bitcoin.client.port'),
  });

  const blockHash = await client.getBlockHash(blockNumber);

  return await client.getBlock(blockHash);
}

export default fetchBlock;
