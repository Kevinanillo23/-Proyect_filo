const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Establece la conexión a MongoDB usando Mongoose.
 *
 * @async
 * @function connectMongoDB
 * @returns {Promise<void>} Una promesa que se resuelve cuando la conexión es exitosa.
 * @throws {Error} Si ocurre un error al conectar con la base de datos.
 */
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(" Conectado a MongoDB");
  } catch (err) {
    console.error(" Error conectando a MongoDB:", err);
  }
};

module.exports = connectMongoDB;
