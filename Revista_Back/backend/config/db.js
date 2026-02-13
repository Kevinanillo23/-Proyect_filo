const { Sequelize } = require("sequelize");
const config = require("./config");

let sequelize;

// Database connection strategy
const initializeSequelize = () => {
  const isPostgresRequired = config.supabase.uri && process.env.NODE_ENV === 'production';

  if (isPostgresRequired) {
    return new Sequelize(config.supabase.uri, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    });
  }

  return new Sequelize(
    config.mysql.name,
    config.mysql.user,
    config.mysql.password,
    {
      host: config.mysql.host,
      dialect: "mysql",
      logging: false
    }
  );
};

sequelize = initializeSequelize();

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    const dialect = sequelize.getDialect();
    console.info(`Database connected: ${dialect.toUpperCase()}`);

    // Sync models in development or if explicitly allowed
    if (process.env.DB_SYNC === 'true' || config.env === 'development') {
      await sequelize.sync();
    }
  } catch (err) {
    console.error("Database connection failure:", err.message);
  }
};

module.exports = { sequelize, connectDB };
