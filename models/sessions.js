'use strict';
module.exports = function(sequelize, DataTypes) {
  var sessions = sequelize.define('sessions', {
    viewer_name: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    start_time: {
      type: DataTypes.TEXT,
      primaryKey: true,
      isAlphanumeric: true
    },
    end_time: {
      type: DataTypes.TEXT,
      isAlphanumeric: true
    },
    hr: {
      type: DataTypes.TEXT,
      is: {
        args: ["\[(\[(\d|\.)+,(\d|\.)+\])?(,\[(\d|\.)+,(\d|\.)+\])*\]"],
        msg: "Must be the string version of an array containing arrays of size 2. Each value must be a number. No spaces aloud."
      }
    },
    gsr: {
      type: DataTypes.TEXT,
      is: {
        args: ["\[(\[(\d|\.)+,(\d|\.)+\])?(,\[(\d|\.)+,(\d|\.)+\])*\]"],
        msg: "Must be the string version of an array containing arrays of size 2. Each value must be a number. No spaces aloud."
      }
    },
    temp: {
      type: DataTypes.TEXT,
      is: {
        args: ["\[(\[(\d|\.)+,(\d|\.)+\])?(,\[(\d|\.)+,(\d|\.)+\])*\]"],
        msg: "Must be the string version of an array containing arrays of size 2. Each value must be a number. No spaces aloud."
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.movies);
      }
    }
  });
  return sessions;
};
