const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_seguro";

/**
 * Iniciar sesión
 * @async
 * @function login
 * @param {object} req - Objeto de petición Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
      message: "Login exitoso",
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en login" });
  }
};

/**
 * Obtener información del usuario autenticado
 * @async
 * @function me
 * @param {object} req - Objeto de petición Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({
      id: user.id,
      username: user.username,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo usuario" });
  }
};

/**
 * Cerrar sesión
 * @async
 * @function logout
 * @param {object} req - Objeto de petición Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
const logout = async (req, res) => {
  res.json({ message: "Logout exitoso" });
};

module.exports = { login, me, logout };
