import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// Hook pour gérer l'inscription d'un nouvel utilisateur
const useSignup = () => {
  // État de chargement pour indiquer si une demande d'inscription est en cours
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  // Fonction d'inscription
  const signup = async ({
    nomComplet,
    pseudo,
    password,
    confirmPassword,
    genre,
  }) => {
    // Vérifie les erreurs de saisie avant de procéder
    const success = handleInputErrors({
      nomComplet,
      pseudo,
      password,
      confirmPassword,
      genre,
    });
    if (!success) return;

    setLoading(true); // Indique que la demande est en cours

    try {
      // Envoie une requête POST à l'API pour s'inscrire
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomComplet,
          pseudo,
          password,
          confirmPassword,
          genre,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error); // Gère les erreurs renvoyées par l'API
      }

      // Stocke l'utilisateur inscrit dans le localStorage et met à jour le contexte
      localStorage.setItem("chat-user", JSON.stringify(data.user));
      setAuthUser(data.user);
      toast.success(data.message); // Affiche un message de succès
    } catch (error) {
      toast.error(error.message); // Affiche un message d'erreur
    } finally {
      setLoading(false); // Indique que la demande est terminée
    }
  };

  return { loading, signup };
};

export default useSignup;

// Fonction pour gérer les erreurs de saisie
function handleInputErrors({
  nomComplet,
  pseudo,
  password,
  confirmPassword,
  genre,
}) {
  // Vérifie que tous les champs sont remplis
  if (!nomComplet || !pseudo || !password || !confirmPassword || !genre) {
    toast.error("Veuillez remplir tous les champs");
    return false;
  }

  // Vérifie que les mots de passe correspondent
  if (password !== confirmPassword) {
    toast.error("Les mots de passe ne correspondent pas");
    return false;
  }

  // Vérifie que le mot de passe a au moins 7 caractères
  if (password.length < 8) {
    toast.error("Le mot de passe doit être d'au moins 7 caractères");
    return false;
  }

  return true; // Indique que toutes les vérifications sont passées
}
