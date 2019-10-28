module.exports = (sequelize, DataTypes) => {
  const OpReturn = sequelize.define(
    'OpReturn',
    {
      encode: DataTypes.TEXT,
      text: DataTypes.TEXT,
    },
    {}
  );

  OpReturn.associate = function(models) {
    OpReturn.belongsTo(models.Transaction, { foreignKey: 'transactionId' });

    OpReturn.belongsTo(models.BlockInfo, { foreignKey: 'blockInfoId' });
  };
  return OpReturn;
};
