'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(
        models.SpotImage,
        { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      )
      Spot.hasMany(
        models.Review,
        { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      )
      Spot.belongsTo(
        models.User,
        { foreignKey: 'ownerId', as: 'Owner', onDelete: 'CASCADE', hooks: true }
      )
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    // createdAt: {
    //   allowNull: false,
    //   type: Sequelize.DATE
    // },
    // updatedAt: {
    //   allowNull: false,
    //   type: Sequelize.DATE
    // }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};