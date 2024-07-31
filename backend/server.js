// Importation des modules nécessaires
import express from "express";
import dotenv from "dotenv";
import path from "path"; // Module pour gérer les chemins de fichiers
import authRoutes from "./routes/auth.route.js";
import connectToMongo from "./db/connectToMongo.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser"; // Middleware pour parser les cookies
import { app, server } from "./socket/socket.js"; // Configuration des WebSockets

dotenv.config(); //  variables d'environnement à partir de .env
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // Définition du chemin de base du projet

// Middlewares pour parser les requêtes en JSON et les cookies
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Servir les fichiers statiques du dossier client/dist
app.use(express.static(path.join(__dirname, "/client/dist")));

// Route par défaut pour servir l'application front-end
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Lancement du serveur et connexion à la base de données
server.listen(PORT, () => {
  connectToMongo();
  console.log(`Server running on port ${PORT}`);
});
