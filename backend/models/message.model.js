import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence au modèle User
      required: true, // L'ID de l'expéditeur est requis
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // L'ID du récepteur est requis
    },
    message: {
      type: String,
      required: true, // Le contenu du message est requis
    },
  },
  { timestamps: true }
);

// Création du modèle Message basé sur le schéma
const Message = mongoose.model("Message", messageSchema);

export default Message;
