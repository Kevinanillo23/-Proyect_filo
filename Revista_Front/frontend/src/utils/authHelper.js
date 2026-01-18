import { API_BASE_URL } from "../config";

/**
 * Helper para realizar peticiones autenticadas con auto-refresh
 * @async
 */
export const fetchWithAuth = async (url, options = {}) => {
    let token = localStorage.getItem("token");

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    let res = await fetch(url, { ...options, headers });

    // Si el token ha expirado (401)
    if (res.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            handleSessionExpired();
            throw new Error("Sesión expirada");
        }

        // Intentar renovar
        const refreshRes = await fetch(`${API_BASE_URL}/api/users/refresh-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();
            localStorage.setItem("token", data.accessToken);

            // Reintentar la petición original con el nuevo token
            headers.Authorization = `Bearer ${data.accessToken}`;
            res = await fetch(url, { ...options, headers });
        } else {
            handleSessionExpired();
            throw new Error("Sesión expirada definitivamente");
        }
    }

    return res;
};

const handleSessionExpired = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
};
