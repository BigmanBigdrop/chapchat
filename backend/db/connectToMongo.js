import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGO DB is connected");
  } catch (error) {
    console.error("Erreur lors de la connexion à MongoDB:", error.message);
    process.exit(1); // Arrêt du processus en cas d'échec de connexion
  }
};

export default connectToMongo;
