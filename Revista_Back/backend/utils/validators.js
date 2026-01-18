/**
 * Valida si un string es un email válido.
 *
 * @function validateEmail
 * @param {string} email - Correo electrónico a validar.
 * @returns {boolean} True si el correo es válido, false en caso contrario.
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Valida si una contraseña cumple con los requisitos:
 * - Mínimo 5 caracteres
 * - Al menos una letra mayúscula
 * - Al menos un número
 *
 * @function validatePassword
 * @param {string} password - Contraseña a validar.
 * @returns {boolean} True si la contraseña es válida, false en caso contrario.
 */
function validatePassword(password) {
  const re = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
  return re.test(password);
}

module.exports = { validateEmail, validatePassword };
