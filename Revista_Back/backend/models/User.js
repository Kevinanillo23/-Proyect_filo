const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

/**
 * Modelo de usuario con Sequelize.
 *
 * Representa un usuario en la base de datos MySQL.
 *
 * @typedef {Object} User
 * @property {number} id - Identificador único del usuario (autoincremental).
 * @property {string} firstname - Nombre del usuario.
 * @property {string} lastname - Apellido del usuario.
 * @property {string} email - Correo electrónico único.
 * @property {string} username - Nombre de usuario único.
 * @property {string} password - Contraseña cifrada del usuario.
 * @property {"user"|"admin"} role - Rol del usuario (por defecto "user").
 */
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    unique: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    allowNull: false,
    defaultValue: "user"
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "users",
  timestamps: false
});

module.exports = User;
