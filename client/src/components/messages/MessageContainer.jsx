import useConversation from "../../zustand/useConversation.js"; // Hook pour obtenir les détails de la conversation
import MessageInput from "./MessageInput.jsx"; // Composant pour l'entrée de message
import Messages from "./Messages.jsx"; // Composant pour afficher les messages
import { TiMessages } from "react-icons/ti"; // Icône pour représenter les messages
import { useAuthContext } from "../../context/AuthContext"; // Contexte pour obtenir les informations de l'utilisateur authentifié
import { useEffect } from "react";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation(); // Obtient et définit la conversation sélectionnée

  useEffect(() => {
    // Nettoyage de la sélection de la conversation lorsque le composant se démonte
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected /> // Affiche un message si aucune conversation n'est sélectionnée
      ) : (
        <>
          {/* En-tête de la conversation */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-teal-400 font-bold">
              {selectedConversation.nomComplet}
            </span>
          </div>
          <Messages /> {/* Affiche les messages */}
          <MessageInput /> {/* Affiche le champ de saisie de message */}
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext(); // Obtient l'utilisateur authentifié
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Bienvenue 👋 {authUser.nomComplet} ❄</p>
        <p>Selectionnez une discussion pour commencer a parler</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />{" "}
        {/* Icône pour représenter les messages */}
      </div>
    </div>
  );
};
