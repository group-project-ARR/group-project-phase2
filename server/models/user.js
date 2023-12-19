'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: `Email is already registered`
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: `Email is Required`
        }, 
        notEmpty: {
          msg: `Email is Required`
        },
        isEmail: {
          msg: `Email Must be Email Format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is Required`
        }, 
        notEmpty: {
          msg: `Password is Required`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password)
  })
  return User;
};