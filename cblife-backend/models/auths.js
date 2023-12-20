const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Auth extends Model {}

Auth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "auth",
    scopes: {
      withoutPassword: {
        attributes: {
          exclude: ["password"],
        },
      },
    },
  }
);

module.exports = Auth;
