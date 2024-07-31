import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext(); // Contexte Socket pour écouter les événements
  const { messages, setMessages } = useConversation(); // État et actions de la conversation

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // Écoute les nouveaux messages via WebSocket
      newMessage.shouldShake = true; // Marque le message comme nécessitant une animation
      const sound = new Audio(notificationSound); // Crée un objet Audio pour jouer le son de notification
      sound.play(); // Joue le son
      setMessages([...messages, newMessage]); // Ajoute le nouveau message à l'état des messages
    });

    return () => socket?.off("newMessage"); // Nettoyage : retire l'écouteur d'événements
  }, [socket, setMessages, messages]); // Dépendances pour exécuter l'effet lorsque le socket ou les messages changent
};
export default useListenMessages;
