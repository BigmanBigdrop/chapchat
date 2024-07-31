import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Référence au modèle User
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message", // Référence au modèle Message
        default: [], //Par defaut, le message est vide
      },
    ],
  },
  { timestamps: true } // Ajoute les champs createdAt et updatedAt automatiquement
);

// Création du modèle Conversation basé sur le schéma
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
