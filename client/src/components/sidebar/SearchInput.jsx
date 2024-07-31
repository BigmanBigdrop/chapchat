import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5"; // Icône pour le bouton de recherche
import useConversation from "../../zustand/useConversation"; // Hook pour obtenir et définir la conversation sélectionnée
import useGetConversations from "../../hooks/useGetConversations"; // Hook pour obtenir les conversations
import toast from "react-hot-toast"; // Bibliothèque pour les notifications toast

const SearchInput = () => {
  const [search, setSearch] = useState(""); // État pour le terme de recherche
  const { setSelectedConversation } = useConversation(); // Hook pour définir la conversation sélectionnée
  const { conversations } = useGetConversations(); // Obtient les conversations

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    if (!search) return; // Ne fait rien si la recherche est vide
    if (search.length < 3) {
      return toast.error(
        "Les termes de la recherche doivent être d'au moins 3 caractères" // Affiche une erreur si la recherche est trop courte
      );
    }

    const conversation = conversations.find(
      (c) => c.fullName.toLowerCase().includes(search.toLowerCase()) // Recherche une conversation par nom
    );

    if (conversation) {
      setSelectedConversation(conversation); // Définit la conversation sélectionnée si trouvée
      setSearch(""); // Réinitialise le champ de recherche
    } else {
      toast.error("Aucun utilisateur correspondant trouvé"); // Affiche une erreur si aucune conversation n'est trouvée
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Recherche…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Met à jour l'état de recherche
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />{" "}
        {/* Icône de recherche */}
      </button>
    </form>
  );
};

export default SearchInput;
