const { Sequelize } = require("sequelize");
require("dotenv").config();

const supabaseSequelize = new Sequelize(process.env.PG_URI, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const connectSupabase = async () => {
    try {
        await supabaseSequelize.authenticate();
        console.log("✅ Supabase (PostgreSQL) Connected");
    } catch (err) {
        console.error("❌ Supabase Connection Error:", err.message);
    }
};

module.exports = { supabaseSequelize, connectSupabase };
