module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      raw: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {}
  );

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.BlockInfo, { foreignKey: 'blockInfoId' });

    Transaction.hasOne(models.OpReturn, {
      foreignKey: 'transactionId',
      as: 'opReturn',
      onDelete: 'CASCADE',
    });
  };

  return Transaction;
};
