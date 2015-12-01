'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movie_name: {
        allowNull: false,
        type: DataTypes.TEXT,
        primaryKey: true
      },
      viewer_name: {
        allowNull: false,
        type: DataTypes.TEXT,
        primaryKey: true
      },
      start_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      hr_data: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      hr_times: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      gsr_data: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      gsr_times: {
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
