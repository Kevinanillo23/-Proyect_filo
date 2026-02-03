const mongoose = require('mongoose');
const ATLAS_URI = "mongodb+srv://kevin23:MONGOKEVIN@cluster0.rac5j25.mongodb.net/revista?appName=Cluster0";

const verify = async () => {
    try {
        const conn = await mongoose.createConnection(ATLAS_URI).asPromise();
        console.log("✅ Conectado a Atlas para verificación.");

        const collections = await conn.db.listCollections().toArray();
        console.log("\nColecciones encontradas en Atlas:");

        for (const col of collections) {
            const count = await conn.db.collection(col.name).countDocuments();
            console.log(`- ${col.name}: ${count} documentos`);
        }

        await conn.close();
    } catch (err) {
        console.error("Error verficando:", err);
    }
};

verify();
