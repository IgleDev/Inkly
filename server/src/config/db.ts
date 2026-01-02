import mongoose from "mongoose";

export const connectionDB = async () => {
    try {
        const databaseUrl = await mongoose.connect(process.env.DATABASE_URL);
        const uri = `${databaseUrl.connection.host}:${databaseUrl.connection.port}`
        console.log('Correctamente conectado a: ' + uri)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}