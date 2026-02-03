const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configuración Local (MySQL)
const localSequelize = new Sequelize(
    process.env.DB_NAME || "filco",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false
    }
);

// Configuración Remota (PostgreSQL) - Esperando URI
const PG_URI = process.env.PG_URI;

if (!PG_URI) {
    console.error("❌ Error: Debes definir la variable de entorno PG_URI con la conexión a PostgreSQL.");
    process.exit(1);
}

const remoteSequelize = new Sequelize(PG_URI, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Necesario para conexiones externas como Supabase/Render
        }
    }
});

const migrate = async () => {
    try {
        console.log("🚀 Iniciando migración MySQL -> PostgreSQL...");

        // 1. Conectar y verificar
        await localSequelize.authenticate();
        console.log("✅ Conectado a MySQL Local.");
        await remoteSequelize.authenticate();
        console.log("✅ Conectado a PostgreSQL Remoto.");

        // 2. Crear tabla si no existe
        console.log("🛠️ Asegurando que la tabla 'users' existe en Supabase...");
        await remoteSequelize.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                firstname VARCHAR(100),
                lastname VARCHAR(100),
                username VARCHAR(100) UNIQUE NOT NULL,
                email VARCHAR(150) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT 'user'
            );
        `);

        console.log("🔄 Leyendo datos de MySQL...");

        // Obtener tablas Users
        const [users] = await localSequelize.query("SELECT * FROM users");
        console.log(`📊 Encontrados ${users.length} usuarios.`);

        if (users.length > 0) {
            for (const user of users) {
                // Verificar si existe en remoto
                const [exists] = await remoteSequelize.query(`SELECT id FROM users WHERE email = :email`, {
                    replacements: { email: user.email }
                });

                if (exists.length === 0) {
                    console.log(`   - Migrando: ${user.email}`);
                    await remoteSequelize.query(
                        `INSERT INTO users (firstname, lastname, username, email, password, role) 
                         VALUES (:firstname, :lastname, :username, :email, :password, :role)`,
                        {
                            replacements: {
                                firstname: user.firstname || '',
                                lastname: user.lastname || '',
                                username: user.username,
                                email: user.email,
                                password: user.password,
                                role: user.role || 'user'
                            }
                        }
                    );
                } else {
                    console.log(`   - Saltando (ya existe): ${user.email}`);
                }
            }
            console.log("✅ Usuarios migrados.");
        }

        console.log("✨ Migración finalizada.");


    } catch (error) {
        console.error("❌ Error en migración:", error);
    } finally {
        await localSequelize.close();
        await remoteSequelize.close();
    }
};

migrate();
