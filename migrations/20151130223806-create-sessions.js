'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('sessions', {
      viewer_name: {
        allowNull: false,
        type: DataTypes.TEXT,
        primaryKey: true
      },
      start_time: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      end_time: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      hr: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      gsr: {
        allowNull: false,
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('sessions');
  }
};
