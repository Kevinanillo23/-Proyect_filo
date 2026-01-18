const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendResetEmail } = require("../utils/mailer");
const { validateEmail, validatePassword } = require("../utils/validators");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_seguro";

/**
 * Registrar un nuevo usuario
 * @async
 * @function register
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password, role } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "El email no es válido" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        error: "La contraseña debe tener mínimo 5 caracteres, al menos una mayúscula y un número"
      });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ error: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
      role: role || "user"
    });

    res.json({
      message: "Usuario registrado correctamente",
      user: { id: newUser.id, username: newUser.username, role: newUser.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

/**
 * Iniciar sesión
 * @async
 * @function login
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login exitoso",
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

/**
 * Solicitar restablecimiento de contraseña
 * @async
 * @function forgotPassword
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(200).json({ message: "Si el correo existe, se enviará un enlace" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    await sendResetEmail(email, token);

    res.json({ message: "Si el correo existe, se enviará un enlace" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error enviando el correo" });
  }
};

/**
 * Restablecer contraseña con token
 * @async
 * @function resetPassword
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!validatePassword(password)) {
      return res.status(400).json({
        error: "La contraseña debe tener mínimo 5 caracteres, al menos una mayúscula y un número"
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });

    res.json({ message: "Contraseña restablecida correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Token inválido o expirado" });
  }
};

/**
 * Obtener todos los usuarios (solo admin)
 * @async
 * @function getAllUsers
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstname", "lastname", "email", "username", "role"]
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

/**
 * Obtener un usuario por ID
 * @async
 * @function getUserById
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "firstname", "lastname", "email", "username", "role"]
    });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

/**
 * Actualizar un usuario (hash de contraseña si se proporciona)
 * @async
 * @function updateUser
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, username, role, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const updates = { firstname, lastname, email, username, role };

    // Si se envía contraseña, la hasheamos
    if (password) {
      if (!validatePassword(password)) {
        return res.status(400).json({
          error: "La contraseña debe tener mínimo 5 caracteres, al menos una mayúscula y un número"
        });
      }
      updates.password = await bcrypt.hash(password, 10);
    }

    await user.update(updates);
    res.json({ message: "Usuario actualizado correctamente", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

/**
 * Eliminar un usuario
 * @async
 * @function deleteUser
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    await user.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
