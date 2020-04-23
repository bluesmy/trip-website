'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    description: DataTypes.TEXT,
    src: DataTypes.STRING,
    type: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    isDefault: DataTypes.BOOLEAN
  }, {});
  Media.associate = function (models) {
    // associations can be defined here
    Media.belongsTo(models.Product)
  };
  return Media;
};