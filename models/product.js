'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    type: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
    Product.hasMany(models.Media)
  };
  return Product;
};