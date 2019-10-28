module.exports = (sequelize, DataTypes) => {
  const BlockInfo = sequelize.define(
    'BlockInfo',
    {
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hash: DataTypes.STRING,
      time: DataTypes.DATE,
    },
    {}
  );

  BlockInfo.associate = async function(models) {
    await BlockInfo.hasMany(models.Transaction, {
      foreignKey: 'blockInfoId',
      as: 'transactions',
      onDelete: 'CASCADE',
    });

    BlockInfo.hasMany(models.OpReturn, {
      foreignKey: 'blockInfoId',
      as: 'opReturn',
      onDelete: 'CASCADE',
    });
  };

  return BlockInfo;
};
