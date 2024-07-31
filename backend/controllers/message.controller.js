import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js"; //obtenir l'ID de socket du récepteur et instance de socket.io

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // Contenu du message à envoyer
    const { id: receiverId } = req.params; // ID du récepteur(venant) des paramètres de la route
    const senderId = req.user._id; // ID de l'expéditeur (utilisateur connecté)

    // Rechercher une conversation existante entre l'expéditeur et le récepteur
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Si aucune conversation n'existe, en créer une nouvelle
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Créer un nouvel objet message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Ajouter le message à la conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Sauvegarder la conversation et le message en parallèle(Et non l'un après l'autre)
    await Promise.all([conversation.save(), newMessage.save()]);

    // Fonctionnalité de socket.io pour envoyer le message en temps réel
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); // Envoyer le message au client spécifique
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Erreur dans le contrôleur sendMessage:", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // ID de l'utilisateur avec qui on souhaite discuter
    const senderId = req.user._id; // ID de l'expéditeur (utilisateur connecté)

    // Rechercher la conversation entre les deux utilisateurs et peupler les messages
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // Populate remplace les références de messages par les messages eux-mêmes

    // Si aucune conversation n'est trouvée, retourner un tableau vide
    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Erreur dans le contrôleur getMessage:", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
