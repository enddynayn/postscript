const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  db: {
    uri: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'postgres://localhost:5432/exodus',
      env: 'DB_URI',
    },
  },
  redis: {
    uri: {
      doc: 'Redis URI',
      format: '*',
      default: 'redis://localhost:6379',
      env: 'REDIS_URI',
    },
  },
  bitcoin: {
    client: {
      network: {
        doc: 'the nework to coneect to',
        format: String,
        default: 'mainnet',
        env: 'BITCOIN_CLIENT_NETWORK',
      },
      host: {
        doc: 'IP address',
        format: 'ipaddress',
        default: '35.188.76.28',
        env: 'BITCOIN_CLIENT_HOST',
      },
      username: {
        doc: 'The username of client.',
        format: String,
        default: 'taco',
        env: 'BITCOIN_CLIENT_USERNAME',
      },
      password: {
        doc: 'The password of client node.',
        format: String,
        default: 'foobar',
        env: 'BITCOIN_CLIENT_PASSWORD',
      },
      port: {
        doc: 'The port to bind.',
        format: 'port',
        default: '8332',
        env: 'BITCOIN_CLIENT_PORT',
      },
    },
    synchronize: {
      start: {
        doc: 'The block-number to start synchronizing at.',
        format: 'nat',
        default: 500000,
        env: 'BITCOIN_SYNCHRONIZE_START',
      },
    },
  },
});

module.exports = config;
