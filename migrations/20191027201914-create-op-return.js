module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('OpReturns', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        encode: {
          type: Sequelize.TEXT,
        },
        text: {
          type: Sequelize.TEXT,
        },
        transactionId: {
          type: Sequelize.INTEGER,
        },
        blockInfoId: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        queryInterface.addIndex('OpReturns', ['encode', 'transactionId']);
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OpReturns');
  },
};
