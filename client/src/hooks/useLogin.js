import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false); // État pour gérer le chargement de la connexion
  const { setAuthUser } = useAuthContext(); // Action pour mettre à jour l'utilisateur authentifié

  const login = async (pseudo, password) => {
    const success = handleInputErrors(pseudo, password); // Vérifie les erreurs de saisie
    if (!success) return;
    setLoading(true); // Indique que le chargement a commencé
    try {
      const res = await fetch("/api/auth/login", {
        // Requête pour se connecter
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, password }),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Conversion de la réponse en JSON
        throw new Error(errorData.message || "Échec de la connexion"); // Gestion des erreurs
      }

      const data = await res.json(); // Conversion de la réponse en JSON
      localStorage.setItem("chat-user", JSON.stringify(data.user)); // Stocke les informations de l'utilisateur
      setAuthUser(data.user); // Met à jour l'utilisateur authentifié
      toast.success(data.message); // Affiche un message de succès
    } catch (error) {
      toast.error(error.message); // Affiche un message d'erreur
    } finally {
      setLoading(false); // Indique que le chargement est terminé
    }
  };

  return { loading, login }; // Retourne l'état de chargement et la fonction de connexion
};
export default useLogin;

function handleInputErrors(pseudo, password) {
  if (!pseudo || !password) {
    toast.error("Veuillez remplir tous les champs"); // Affiche une erreur si les champs sont vides
    return false;
  }

  return true;
}
