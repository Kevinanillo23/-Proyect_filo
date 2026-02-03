const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_seguro";

/**
 * Middleware para autenticar usuarios con rol de administrador.
 *
 * Verifica el token JWT en la cabecera `Authorization`,
 * busca el usuario en la base de datos y valida si es admin.
 *
 * @async
 * @function authenticateAdmin
 * @param {import("express").Request} req - Objeto de la petición HTTP.
 * @param {import("express").Response} res - Objeto de la respuesta HTTP.
 * @param {import("express").NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void} Envía un error JSON si la autenticación falla, de lo contrario continúa.
 */
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No autorizado" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Acceso denegado: solo administradores" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = authenticateAdmin;
