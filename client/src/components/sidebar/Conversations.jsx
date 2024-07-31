import React from "react";
import useGetConversations from "../../hooks/useGetConversations"; // Hook pour obtenir les conversations
import Conversation from "./Conversation"; // Composant pour afficher une conversation
import { getRandomEmoji } from "../../utils/emojis"; // Fonction utilitaire pour obtenir un emoji aléatoire

const Conversations = () => {
  const { loading, conversations } = useGetConversations(); // Obtient les conversations et l'état de chargement

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()} // Assure que getRandomEmoji est invoqué
          lastIdx={idx === conversations.length - 1} // Définit si c'est le dernier élément
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span> // Affiche un spinner pendant le chargement
      ) : null}
    </div>
  );
};

export default Conversations;
