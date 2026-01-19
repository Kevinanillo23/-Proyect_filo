const bcrypt = require("bcrypt");
const User = require("./models/user");
require("dotenv").config();

(async () => {
    try {
        const hashedPassword = await bcrypt.hash("Admin1234", 10);
        const [user, created] = await User.findOrCreate({
            where: { username: "admin" },
            defaults: {
                firstname: "Admin",
                lastname: "System",
                email: "admin@filco.com",
                username: "admin",
                password: hashedPassword,
                role: "admin"
            }
        });

        if (!created) {
            user.password = hashedPassword;
            user.role = "admin";
            await user.save();
            console.log("Password updated for admin");
        } else {
            console.log("Admin user created");
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
