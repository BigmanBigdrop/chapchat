import { useState } from "react";
import { BsSend } from "react-icons/bs"; // Icône pour le bouton d'envoi
import useSendMessage from "../../hooks/useSendMessage"; // Hook pour envoyer des messages

const MessageInput = () => {
  const [message, setMessage] = useState(""); // État pour le contenu du message
  const { loading, sendMessage } = useSendMessage(); // Obtient la fonction d'envoi de message et l'état de chargement

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    if (!message) return; // Ne fait rien si le message est vide
    await sendMessage(message); // Envoie le message
    setMessage(""); // Réinitialise le champ de saisie
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Passer une commande"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Met à jour l'état du message
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div> // Affiche un spinner pendant le chargement
          ) : (
            <BsSend /> // Affiche l'icône d'envoi lorsque le chargement est terminé
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
