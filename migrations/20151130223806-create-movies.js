'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('movies', {
      movie_name: {
        allowNull: false,
        type: DataTypes.TEXT,
        primaryKey: true
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('movies');
  }
};
