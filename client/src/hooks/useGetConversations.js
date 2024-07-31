import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false); // État pour gérer le chargement des conversations
  const [conversations, setConversations] = useState([]); // État pour stocker les conversations

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true); // Indique que le chargement a commencé
      try {
        const res = await fetch("/api/users"); // Requête pour récupérer les conversations
        const data = await res.json(); // Conversion de la réponse en JSON
        if (data.error) {
          throw new Error(data.error); // Gestion des erreurs
        }
        setConversations(data); // Mise à jour des conversations
      } catch (error) {
        toast.error(error.message); // Affichage d'un message d'erreur
      } finally {
        setLoading(false); // Indique que le chargement est terminé
      }
    };

    getConversations(); // Appel de la fonction de récupération des conversations
  }, []); // Dépendances vides pour que l'effet s'exécute une seule fois

  return { loading, conversations }; // Retourne l'état de chargement et les conversations
};
export default useGetConversations;
