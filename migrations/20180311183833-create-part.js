'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Parts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imgURL: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.TEXT
      },
      partNum: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      replacesParts: {
        type: Sequelize.TEXT
      },
      fitsModels: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Parts');
  }
};