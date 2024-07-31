import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false); // État pour gérer le chargement des messages
  const { messages, setMessages, selectedConversation } = useConversation(); // État et actions de la conversation sélectionnée

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true); // Indique que le chargement a commencé
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`); // Requête pour récupérer les messages de la conversation sélectionnée
        const data = await res.json(); // Conversion de la réponse en JSON
        if (data.error) throw new Error(data.error); // Gestion des erreurs
        setMessages(data); // Mise à jour des messages
      } catch (error) {
        toast.error(error.message); // Affichage d'un message d'erreur
      } finally {
        setLoading(false); // Indique que le chargement est terminé
      }
    };

    if (selectedConversation?._id) getMessages(); // Appelle la fonction si une conversation est sélectionnée
  }, [selectedConversation?._id, setMessages]); // Dépendances pour exécuter l'effet lorsque la conversation sélectionnée change

  return { messages, loading }; // Retourne les messages et l'état de chargement
};
export default useGetMessages;
