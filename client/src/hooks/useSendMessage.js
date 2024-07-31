import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false); // État pour gérer le chargement de l'envoi du message
  const { messages, setMessages, selectedConversation } = useConversation(); // État et actions de la conversation sélectionnée

  const sendMessage = async (message) => {
    setLoading(true); // Indique que le chargement a commencé
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`, // Requête pour envoyer un message
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json(); // Conversion de la réponse en JSON
      if (data.error) throw new Error(data.error); // Gestion des erreurs

      setMessages([...messages, data]); // Ajoute le message envoyé à l'état des messages
    } catch (error) {
      toast.error(error.message); // Affiche un message d'erreur
    } finally {
      setLoading(false); // Indique que le chargement est terminé
    }
  };

  return { sendMessage, loading }; // Retourne la fonction d'envoi de message et l'état de chargement
};
export default useSendMessage;
