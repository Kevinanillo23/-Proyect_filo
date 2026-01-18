/**
 * Configuración global del frontend.
 * En producción (Vercel), usará la URL definida en las variables de entorno.
 * En desarrollo, usará localhost.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
