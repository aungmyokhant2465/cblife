const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Promotions extends Model {}

Promotions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paragraph: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "promotions",
  }
);

module.exports = Promotions;
