const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.stack);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: "error",
        message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message
    });
};

module.exports = errorHandler;
