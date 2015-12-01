'use strict';
module.exports = function(sequelize, DataTypes) {
  var sessions = sequelize.define('sessions', {
    movie_name: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    viewer_name: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    start_time: {
      type: DataTypes.DATE,
      primaryKey: true
    },
    end_time: DataTypes.DATE,
    hr_data: DataTypes.TEXT,
    hr_times: DataTypes.TEXT,
    gsr_data: DataTypes.TEXT,
    gsr_times: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sessions;
};
