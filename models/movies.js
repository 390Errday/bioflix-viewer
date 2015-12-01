'use strict';
module.exports = function(sequelize, DataTypes) {
  var Movies = sequelize.define('Movies', {
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Movies;
};