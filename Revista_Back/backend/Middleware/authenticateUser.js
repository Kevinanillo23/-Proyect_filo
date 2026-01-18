const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_seguro";

/**
 * Middleware para autenticar a cualquier usuario.
 *
 * Verifica el token JWT en la cabecera `Authorization`
 * y agrega la información decodificada del usuario a `req.user`.
 *
 * @function authenticateUser
 * @param {import("express").Request} req - Objeto de la petición HTTP.
 * @param {import("express").Response} res - Objeto de la respuesta HTTP.
 * @param {import("express").NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void} Envía un error JSON si la autenticación falla, de lo contrario continúa.
 */
const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No autorizado" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = authenticateUser;
