const nodemailer = require("nodemailer");
const config = require("../config/config");


const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const sendResetEmail = (email, token) => {
  const resetLink = `${config.clientUrl}/reset-password/${token}`;
  const mailOptions = {
    from: `"replica filco" <${config.email.user}>`,

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
