const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
console.log("Testing connection to:", uri.split('@')[1]); // Log only the host part for security

mongoose.connect(uri)
    .then(() => {
        console.log("SUCCESSS: Connected to MongoDB Atlas!");
        process.exit(0);
    })
    .catch(err => {
        console.error("FAILURE: Could not connect to MongoDB Atlas.");
        console.error("Error Detail:", err.message);
        process.exit(1);
    });
