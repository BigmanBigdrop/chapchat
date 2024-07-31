import { create } from "zustand";

// Crée un store Zustand pour gérer l'état des conversations
const useConversation = create((set) => ({
  // Conversation sélectionnée actuellement
  selectedConversation: null,
  // Fonction pour mettre à jour la conversation sélectionnée
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  // Liste des messages de la conversation sélectionnée
  messages: [],
  // Fonction pour mettre à jour la liste des messages
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
