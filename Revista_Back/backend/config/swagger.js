const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("./config");


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API FILOSOFÍA&CO",
      version: "1.0.0",
      description: "API para gestión de artículos y autenticación",
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
      },
    ],
  },

  apis: ["./routes/*.js"], // Archivos donde se buscarán anotaciones Swagger
};

/**
 * Esquema generado de Swagger con las opciones configuradas.
 *
 * @type {object}
 */
const swaggerSpec = swaggerJsDoc(options);

/**
 * Configura Swagger en la aplicación Express.
 *
 * @function setupSwagger
 * @param {import("express").Express} app - Instancia de la aplicación Express.
 */
const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
