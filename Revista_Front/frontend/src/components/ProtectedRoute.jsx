import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Componente de Ruta Protegida.
 * Verifica si el usuario está autenticado y si tiene el rol necesario.
 * 
 * @param {Object} props
 * @param {JSX.Element} props.children - Componente a renderizar si hay acceso.
 * @param {string} props.requiredRole - (Opcional) Rol necesario para acceder.
 */
const ProtectedRoute = ({ children, requiredRole }) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // Si no hay token o usuario, redirigir al login
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Si se requiere un rol específico y el usuario no lo tiene, redirigir al inicio
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
