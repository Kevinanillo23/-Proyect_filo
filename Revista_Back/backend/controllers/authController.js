const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const config = require("../config/config");

const JWT_SECRET = config.jwt.secret;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Sesión iniciada",
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (err) {
    console.error("Auth Logic Failure:", err.message);
    res.status(500).json({ error: "Error en el sistema de autenticación" });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'role']
    });
    if (!user) return res.status(404).json({ error: "Usuario no reconocido" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error de servidor" });
  }
};

exports.logout = async (req, res) => {
  res.json({ message: "Sesión cerrada correctamente" });
};
