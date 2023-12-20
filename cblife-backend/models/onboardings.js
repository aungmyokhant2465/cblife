const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Onboardings extends Model {}

Onboardings.init(
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
    modelName: "onboardings",
  }
);

module.exports = Onboardings;
