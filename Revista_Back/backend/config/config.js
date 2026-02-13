require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    jwt: {
        secret: process.env.JWT_SECRET || 'dev_secret_key',
        refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'dev_refresh_key',
        expiresIn: '1h',
        refreshExpiresIn: '7d'
    },
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || 'filco',
        dialect: 'mysql'
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

// Validate critical security environment variables in production
if (config.env === 'production') {
    const criticalVars = ['JWT_SECRET', 'REFRESH_TOKEN_SECRET'];
    criticalVars.forEach(key => {
        if (!process.env[key]) {
            console.error(`ERROR: Security variable ${key} is missing in production environment.`);
        }
    });
}

module.exports = config;
