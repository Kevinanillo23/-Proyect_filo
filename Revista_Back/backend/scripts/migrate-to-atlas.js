const mongoose = require('mongoose');
require('dotenv').config();

// Configuración
const LOCAL_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/revista";
// TODO: Reemplaza esto con tu URI de Atlas si no está en el .env
const ATLAS_URI = process.env.ATLAS_URI || "mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>.mongodb.net/revista";

const migrate = async () => {
    console.log("🚀 Iniciando migración de datos...");
    console.log(`📂 Origen: ${LOCAL_URI}`);
    console.log(`☁️  Destino: ${ATLAS_URI.includes("mongodb+srv") ? "MongoDB Atlas" : "Destino desconocido"}`);

    // 1. Conectar a Local
    const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log("✅ Conectado a Local");

    // 2. Conectar a Atlas
    const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
    console.log("✅ Conectado a Atlas");

    try {
        // Obtener lista de colecciones
        const collections = await localConn.db.listCollections().toArray();

        for (const colInfo of collections) {
            const colName = colInfo.name;
            if (colName.startsWith('system.')) continue;

            console.log(`\n📦 Migrando colección: ${colName}`);

            // Leer datos de local
            const data = await localConn.db.collection(colName).find().toArray();
            console.log(`   - Leídos ${data.length} documentos.`);

            if (data.length > 0) {
                // Escribir en Atlas
                const atlasCol = atlasConn.db.collection(colName);

                // Opcional: Limpiar colección destino antes
                // await atlasCol.deleteMany({}); 

                // Usar bulkWrite para eficiencia y evitar duplicados por _id
                const ops = data.map(doc => ({
                    updateOne: {
                        filter: { _id: doc._id },
                        update: { $set: doc },
                        upsert: true
                    }
                }));

                const result = await atlasCol.bulkWrite(ops);
                console.log(`   - ✅ Migrados: ${result.upsertedCount + result.modifiedCount} (Upserts/Mods)`);
            } else {
                console.log("   - Colección vacía, saltando.");
            }
        }

        console.log("\n✨ Migración completada exitosamente.");

    } catch (error) {
        console.error("❌ Error durante la migración:", error);
    } finally {
        await localConn.close();
        await atlasConn.close();
        process.exit(0);
    }
};

migrate();
