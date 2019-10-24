import convict from 'convict';

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
});

export default config;
