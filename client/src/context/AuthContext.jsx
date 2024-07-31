import { createContext, useContext, useState } from "react";

// Création du contexte d'authentification
export const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Composant Provider pour fournir le contexte aux enfants
export const AuthContextProvider = ({ children }) => {
  // Initialisation de l'état authUser à partir du localStorage ou null
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
