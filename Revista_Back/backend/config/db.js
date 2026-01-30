const { Sequelize } = require("sequelize");
require("dotenv").config();

/**
 * Instancia de Sequelize para la conexión a la base de datos PostgreSQL (Supabase).
 * Actualizado para soportar migraciones desde MySQL.
 *
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || "filco",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false, // Desactivar logs de SQL en consola por defecto
    dialectOptions: {
      ssl: process.env.NODE_ENV === "production" ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    define: {
      // Evita que Sequelize intente pluralizar los nombres de las tablas
      freezeTableName: true,
      // Asegura que los nombres de las columnas se mantengan tal cual
      underscored: false
    }
  }
);

module.exports = sequelize;
