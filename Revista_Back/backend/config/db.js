const { Sequelize } = require("sequelize");
const { execSync } = require("child_process");
const config = require("./config");


let sequelize;
const isSupabaseAvailable = () => {
  try {
    execSync("nslookup aws-1-eu-west-1.pooler.supabase.com", { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

if (isSupabaseAvailable()) {
  console.log("🌐 Supabase DNS detected. Initializing PostgreSQL connection...");
  sequelize = new Sequelize(config.supabase.uri, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  console.log("🏠 Supabase not reachable. Initializing local MySQL connection...");
  sequelize = new Sequelize(
    config.mysql.name,
    config.mysql.user,
    config.mysql.password,
    {
      host: config.mysql.host,
      dialect: "mysql",
      logging: false
    }
  );
}


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database Connected: ${sequelize.getDialect() === 'postgres' ? 'Supabase' : 'MySQL'}`);
    await sequelize.sync();
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
};

module.exports = { sequelize, connectDB };
