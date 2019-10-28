module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('BlockInfos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        height: {
          unique: true,
          type: Sequelize.INTEGER,
        },
        hash: {
          unique: true,
          type: Sequelize.STRING,
        },
        time: {
          type: Sequelize.DATE,
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
        queryInterface.addIndex('BlockInfos', ['height', 'hash']);
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BlockInfos');
  },
};
