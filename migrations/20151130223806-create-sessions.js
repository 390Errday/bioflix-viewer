'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('sessions', {
      viewer_name: {
        allowNull: false,
        type: Sequelize.TEXT,
        primaryKey: true
      },
      start_time: {
        allowNull: false,
        type: Sequelize.TEXT,
        primaryKey: true
      },
      end_time: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      hr: {
        type: Sequelize.TEXT
      },
      gsr: {
        type: Sequelize.TEXT
      },
      temp: {
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
