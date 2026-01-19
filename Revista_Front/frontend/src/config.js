/**
 * Config General
 * Entorno: Produccion (Vercel) o Desarrollo (Localhost)
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";