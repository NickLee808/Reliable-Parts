'use strict';
module.exports = (sequelize, DataTypes) => {
  var Part = sequelize.define('Part', {
    imgURL: DataTypes.STRING,
    title: DataTypes.STRING,
    partNum: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    replacesParts: DataTypes.STRING,
    fitsModels: DataTypes.STRING
  }, {});
  Part.associate = function(models) {
    // associations can be defined here
  };
  return Part;
};