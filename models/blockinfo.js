export default (sequelize, DataTypes) => {
  const BlockInfo = sequelize.define(
    'BlockInfo',
    {
      block_height: DataTypes.INTEGER,
    },
    {}
  );

  BlockInfo.associate = function(models) {
    // associations can be defined here
  };
  return BlockInfo;
};
