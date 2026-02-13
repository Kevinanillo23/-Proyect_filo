const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");
const { sendResetEmail } = require("../utils/mailer");
const { validateEmail, validatePassword } = require("../utils/validators");

const { secret: JWT_SECRET, refreshSecret: REFRESH_TOKEN_SECRET } = config.jwt;

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password, role } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Formato de email inválido" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        error: "La contraseña no cumple con los requisitos de seguridad"
      });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ error: "El nombre de usuario ya está en uso" });

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) return res.status(400).json({ error: "El email ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
      role: role || "user"
    });

    return res.status(201).json({
      message: "Registro completado con éxito",
      user: { id: newUser.id, username: newUser.username, role: newUser.role }
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError") {
      const detail = error.errors?.[0];
      const msg = detail ? (detail.path === "email" ? "Email ya registrado" : detail.message) : "Error de validación";
      return res.status(400).json({ error: msg });
    }

    console.error("Registration Error:", error.message);
    return res.status(500).json({ error: "Error interno durante el registro" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales no válidas" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await user.update({ refreshToken });

    res.json({
      accessToken,
      refreshToken,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Error de autenticación" });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: "Token de renovación ausente" });

  try {
    const user = await User.findOne({ where: { refreshToken } });
    if (!user) return res.status(403).json({ error: "Sesión expirada" });

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        return res.status(403).json({ error: "Sesión no válida" });
      }

      const accessToken = generateAccessToken(user);
      res.json({ accessToken });
    });
  } catch (error) {
    console.error("Refresh Error:", error.message);
    res.status(500).json({ error: "Error al renovar sesión" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
      await sendResetEmail(email, token);
    }
    // Consistent message for security
    res.json({ message: "Si el correo está registrado, recibirá un enlace de recuperación pronto" });
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    res.status(500).json({ error: "No se pudo procesar la solicitud" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Requisitos de contraseña no cumplidos" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(400).json({ error: "Cuenta no encontrada" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    res.status(400).json({ error: "Enlace inválido o expirado" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstname", "lastname", "email", "username", "role"]
    });
    res.json(users);
  } catch (error) {
    console.error("Fetch Users Error:", error.message);
    res.status(500).json({ error: "No se pudieron obtener los usuarios" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "firstname", "lastname", "email", "username", "role"]
    });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error("Fetch User Error:", error.message);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, username, role, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const updates = { firstname, lastname, email, username, role };

    if (password) {
      if (!validatePassword(password)) {
        return res.status(400).json({ error: "Contraseña no válida" });
      }
      updates.password = await bcrypt.hash(password, 10);
    }

    await user.update(updates);
    res.json({ message: "Perfil actualizado correctamente", user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Update User Error:", error.message);
    res.status(500).json({ error: "Error al actualizar" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    await user.destroy();
    res.json({ message: "Cuenta de usuario eliminada" });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    res.status(500).json({ error: "No se pudo eliminar el usuario" });
  }
};
