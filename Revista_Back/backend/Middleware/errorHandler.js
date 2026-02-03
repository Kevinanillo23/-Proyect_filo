const config = require("../config/config");

const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.name}: ${err.message}`);
    if (config.env !== 'production') {
        console.error(err.stack);
    }

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Handle Specific Errors
    if (err.name === "SequelizeUniqueConstraintError") {
        statusCode = 400;
        message = "El dato ya existe en el sistema.";
    } else if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
    } else if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Token inválido.";
    } else if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "El token ha expirado.";
    }

    res.status(statusCode).json({
        status: "error",
        message: config.env === "production" && statusCode === 500
            ? "Algo salió mal, intenta más tarde."
            : message,
        ...(config.env !== 'production' && { stack: err.stack })
    });
};

module.exports = errorHandler;
