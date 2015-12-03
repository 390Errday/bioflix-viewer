'use strict';
module.exports = function(sequelize, DataTypes) {
  var movies = sequelize.define('movies', {
    movie_name: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    poster_url: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.sessions);
      }
    }
  });
  return movies;
};
