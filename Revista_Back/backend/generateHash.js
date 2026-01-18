const bcrypt = require("bcrypt");

/**
 * Script para generar un hash de prueba de una contraseña.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Imprime el hash generado en consola.
 */
(async () => {
  const hash = await bcrypt.hash("Admin123", 10);
  console.log("Hash generado:", hash);
})();
