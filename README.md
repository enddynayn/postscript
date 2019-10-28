# EXODUS

API for fetching bitcoins OP_RETURN outputs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

What things you need to install the software and how to install them

```
brew install redis
```

```
brew install postgres
```

```
bitcoin-core
```

```
brew install nvm
```

### Installing

A step by step series of examples that tell you how to get a development env running

To get started

```
Install dependencies redis, postgres, nodejs, bitcore.
```

```
yarn install
```

```
npx sequelize-cli db:migrate
```

```
yarn start
```

```
yarn work
```

## Built With

- [Express](http://expressjs.com) - The web server used
- [BullJS](https://github.com/OptimalBits/bull) - Background jobs
- [Arena](https://github.com/mixmaxhq/arena) - Used to view the Bulljs job queue.
- [Redis](https://redis.io/) - Used for task queues

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Helpful tool to debug

- [redis-cli](https://redis.io/topics/rediscli) - helps to clear queue

  - FLUSHALL (be careful will delete all of your redis)

- [BULL-REPL](https://github.com/darky/bull-repl) - helps see queue stats using command-line. You can also clear queue.

- [Arena](https://github.com/mixmaxhq/arena) - Used to view the Bulljs job queue.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Authors

- **Enddy Dumbrique**

## Acknowledgments

- thanks! Stephannie
