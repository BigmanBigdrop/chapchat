import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Importation des styles globaux
import { BrowserRouter } from "react-router-dom"; // Fournisseur de routage pour l'application
import { AuthContextProvider } from "./context/AuthContext.jsx"; // Fournisseur du contexte d'authentification
import { SocketContextProvider } from "./context/SocketContext.jsx"; // Fournisseur du contexte des sockets

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthContextProvider>
        <SocketContextProvider>
          <App /> {/* Rendu du composant principal de l'application */}
        </SocketContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
