import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages"; // Hook pour obtenir les messages
import MessageSkeleton from "../skeletons/messageSkeleton"; // Composant pour afficher un squelette de message pendant le chargement
import Message from "./Message"; // Composant pour afficher un message
import useListenMessages from "../../hooks/useListenMessages"; // Hook pour écouter les nouveaux messages

const Messages = () => {
  const { messages, loading } = useGetMessages(); // Obtient les messages et l'état de chargement
  useListenMessages(); // Écoute les nouveaux messages
  const lastMessageRef = useRef(); // Référence pour faire défiler le dernier message

  useEffect(() => {
    // Fait défiler automatiquement vers le dernier message
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} /> {/* Affiche chaque message */}
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}{" "}
      {/* Affiche des squelettes de message pendant le chargement */}
      {!loading && messages.length === 0 && (
        <p className="text-center">
          Veuillez repondre des que vous voyez une notification
        </p> /* Message affiché si aucune conversation n'est encore démarrée */
      )}
    </div>
  );
};

export default Messages;
