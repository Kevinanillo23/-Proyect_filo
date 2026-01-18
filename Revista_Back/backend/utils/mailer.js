const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * Configuración del transporter de Nodemailer usando credenciales desde .env
 */
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envía un correo electrónico con un enlace de restablecimiento de contraseña.
 *
 * @async
 * @function sendResetEmail
 * @param {string} email - Dirección de correo del usuario.
 * @param {string} token - Token JWT de restablecimiento de contraseña.
 * @returns {Promise<void>} Promesa que se resuelve cuando el correo ha sido enviado.
 * @throws {Error} Si ocurre un error al enviar el correo.
 */
const sendResetEmail = (email, token) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
  const mailOptions = {
    from: `"replica filco" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Restablecer contraseña",
    html: `
      <p>Haz click en el enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">Restablecer contraseña</a>
      <p>El enlace caduca en 1 hora.</p>
    `,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
