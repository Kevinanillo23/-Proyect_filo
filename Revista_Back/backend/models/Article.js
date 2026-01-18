const mongoose = require("mongoose");

/**
 * Esquema de artículos para MongoDB con Mongoose.
 *
 * @typedef {Object} Article
 * @property {string} title - Título del artículo (requerido).
 * @property {string} content - Contenido del artículo (requerido).
 * @property {string|null} image - URL de la imagen (opcional, puede ser null).
 * @property {Date} createdAt - Fecha de creación (generada automáticamente).
 * @property {Date} updatedAt - Fecha de última actualización (generada automáticamente).
 */
const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    url: { type: String, default: null }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema, "articles");
