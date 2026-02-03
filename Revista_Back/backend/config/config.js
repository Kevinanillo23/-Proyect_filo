require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    jwt: {
        secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro',
        refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'tu_secreto_refresh_super_seguro',
        expiresIn: '30m',
        refreshExpiresIn: '7d'
    },
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || 'filco',
        dialect: process.env.DB_DIALECT || 'mysql'
    },
    mongodb: {
        uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/revista'
    },
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        service: process.env.EMAIL_SERVICE || 'gmail'
    },
    supabase: {
        uri: process.env.PG_URI
    }
};

// Simple validation
const requiredEnv = ['JWT_SECRET', 'REFRESH_TOKEN_SECRET'];
requiredEnv.forEach(key => {
    if (!process.env[key]) {
        if (config.env === 'production') {
            console.error(`⚠️ CRITICAL: Environment variable ${key} is missing! Using temporary fallback.`);
            // Fallback temporal para que no explote el deploy
            process.env[key] = "fallback_secret_temporary_123";
        }
    }
});


module.exports = config;
