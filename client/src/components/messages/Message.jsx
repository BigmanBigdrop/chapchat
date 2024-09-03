import { useAuthContext } from "../../context/AuthContext"; // Contexte pour obtenir les informations de l'utilisateur authentifié
import { extractTime } from "../../utils/extractTime"; //formater l'heure
import useConversation from "../../zustand/useConversation"; // Hook pour les détails de la conversation

const Message = ({ message }) => {
  const { authUser } = useAuthContext(); // Obtient l'utilisateur authentifié
  const { selectedConversation } = useConversation(); // Obtient la conversation sélectionnée
  const fromMe = message.senderId === authUser._id; // Vérifie si le message vient de l'utilisateur authentifié
  const formattedTime = extractTime(message.createdAt); // Formate l'heure du message
  const chatClassName = fromMe ? "chat-end" : "chat-start"; // Définit la position du message dans la conversation
  const photoDeProfil = fromMe
    ? authUser.photoDeProfil
    : selectedConversation?.photoDeProfil; // Obtient la photo de profil appropriée
  const bubbleBgColor = fromMe ? "bg-blue-500" : ""; // Définit la couleur de fond de la bulle de message

  const shakeClass = message.shouldShake ? "shake" : ""; // Ajoute une classe pour faire trembler le message si nécessaire

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src={photoDeProfil} />{" "}
          {/* Affiche la photo de profil(A enlever dans Chapway) */}
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message} {/* Affiche le contenu du message */}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime} {/* Affiche l'heure formatée du message */}
      </div>
    </div>
  );
};

export default Message;
