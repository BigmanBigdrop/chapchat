import { Server } from "socket.io";
import http from "http"; // Importation du module HTTP de Node.js
import express from "express";

const app = express(); // Ceci initialement dans server.js, passe ici parce que socket gere le backend

const server = http.createServer(app); // Création du serveur HTTP
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], // Autorisation des requêtes provenant de ce domaine
    methods: ["GET", "POST"], // Autorisation des méthodes GET et POST
  },
});

const userSocketMap = {}; // { userId: socketId } - Mapping des utilisateurs connectés et leurs IDs de socket

// Fonction pour récupérer l'ID de socket du récepteur
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Événement de connexion
io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté", socket.id);

  // Récupération de l'ID de l'utilisateur à partir des paramètres de la requête de socket
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id; // Ajout de l'ID de l'utilisateur et de socket au mapping
  }

  // Emission de l'événement pour obtenir les utilisateurs en ligne
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Événement de déconnexion
  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté", socket.id);
    delete userSocketMap[userId]; // Suppression de l'utilisateur du mapping
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
