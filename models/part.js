'use strict';
module.exports = (sequelize, DataTypes) => {
  var Part = sequelize.define('Part', {
    imgURL: DataTypes.TEXT,
    title: DataTypes.TEXT,
    partNum: DataTypes.TEXT,
    price: DataTypes.TEXT,
    description: DataTypes.TEXT,
    replacesParts: DataTypes.TEXT,
    fitsModels: DataTypes.TEXT
  }, {});
  Part.associate = function(models) {
    // associations can be defined here
  };
  return Part;
};