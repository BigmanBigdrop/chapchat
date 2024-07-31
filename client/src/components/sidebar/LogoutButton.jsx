import { BiLogOut } from "react-icons/bi"; // Icône pour le bouton de déconnexion
import useLogout from "../../hooks/useLogout"; // Hook pour gérer la déconnexion

const LogoutButton = () => {
  const { loading, logout } = useLogout(); // Obtient la fonction de déconnexion et l'état de chargement

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout} // Déclenche la déconnexion au clic
        />
      ) : (
        <span className="loading loading-spinner"></span> // Affiche un spinner pendant le chargement
      )}
    </div>
  );
};

export default LogoutButton;
