import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false); // État pour gérer le chargement de la déconnexion
  const { setAuthUser } = useAuthContext(); // Action pour mettre à jour l'utilisateur authentifié

  const logout = async () => {
    setLoading(true); // Indique que le chargement a commencé
    try {
      const res = await fetch("/api/auth/logout", {
        // Requête pour se déconnecter
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json(); // Conversion de la réponse en JSON
      if (data.error) {
        throw new Error(data.error); // Gestion des erreurs
      }

      localStorage.removeItem("chat-user"); // Supprime les informations de l'utilisateur du localStorage
      setAuthUser(null); // Met à jour l'utilisateur authentifié
    } catch (error) {
      toast.error(error.message); // Affiche un message d'erreur
    } finally {
      setLoading(false); // Indique que le chargement est terminé
    }
  };

  return { loading, logout }; // Retourne l'état de chargement et la fonction de déconnexion
};
export default useLogout;
