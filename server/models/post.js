'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User)
      Post.belongsTo(models.Category)
    }
  }
  Post.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name is Required`
        }, notEmpty: {
          msg: `Name is Required`
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Price is Required`
        }, notEmpty: {
          msg: `Price is Required`
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Location is Required`
        }, notEmpty: {
          msg: `Location is Required`
        }
      }
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Condition is Required`
        }, notEmpty: {
          msg: `Condition is Required`
        }
      }
    },
    imageUrl: DataTypes.STRING,
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `CategoryId is Required`
        }, notEmpty: {
          msg: `CategoryId is Required`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `UserId is Required`
        }, notEmpty: {
          msg: `UserId is Required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};