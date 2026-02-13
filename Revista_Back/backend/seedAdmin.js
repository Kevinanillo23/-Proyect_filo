const bcrypt = require("bcrypt");
const User = require("./models/User");
const { connectDB } = require("./config/db");

const seedAdmin = async () => {
    try {
        await connectDB();

        const username = "admin";
        const hashedPassword = await bcrypt.hash("Admin1234", 10);

        const [user, created] = await User.findOrCreate({
            where: { username },
            defaults: {
                firstname: "Administrator",
                lastname: "System",
                email: "admin@filco.com",
                username,
                password: hashedPassword,
                role: "admin"
            }
        });

        if (created) {
            console.info(`Initial admin user created: ${username}`);
        } else {
            user.password = hashedPassword;
            user.role = "admin";
            await user.save();
            console.info(`Admin user [${username}] credentials updated`);
        }

        process.exit(0);
    } catch (err) {
        console.error("Seed failure:", err.message);
        process.exit(1);
    }
};

seedAdmin();
