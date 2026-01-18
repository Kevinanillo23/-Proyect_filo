const { Sequelize } = require("sequelize");
require("dotenv").config();

/**
 * Instancia de Sequelize para la conexión a la base de datos MySQL.
 *
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || "filco",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "root",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
  }
);

module.exports = sequelize;
