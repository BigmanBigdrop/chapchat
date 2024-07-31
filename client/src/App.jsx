import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Importation des composants pour le routage
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import { Toaster } from "react-hot-toast"; // Importation du composant de notifications
import { useAuthContext } from "./context/AuthContext"; // Importation du contexte d'authentification

export default function App() {
  const { authUser } = useAuthContext(); // Récupération de l'utilisateur authentifié à partir du contexte
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />} // Redirige vers la page d'accueil si authentifié, sinon vers la page de connexion
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />} // Redirige vers la page d'accueil si authentifié, sinon vers la page de connexion
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />} // Redirige vers la page d'accueil si authentifié, sinon vers la page d'inscription
        />
      </Routes>
      <Toaster /> {/* Composant pour afficher les notifications toast */}
    </div>
  );
}
