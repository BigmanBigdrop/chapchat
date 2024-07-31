import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin"; // Hook personnalisé pour la connexion

const Login = () => {
  const [pseudo, setPseudo] = useState(""); // État pour le pseudo de l'utilisateur
  const [password, setPassword] = useState(""); // État pour le mot de passe de l'utilisateur

  const { loading, login } = useLogin(); // Appel du hook pour la connexion

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    await login(pseudo, password); // Appelle la fonction de connexion
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div
        className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter 
      backdrop-blur-lg bg-opacity-0"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-300 mb-4">
          Connexion
          <span className="text-blue-500">CHAPCHAT</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Pseudo</span>
            </label>
            <input
              type="text"
              placeholder="Entrer le nom d'utilisateur"
              className="w-full input input-bordered h-10"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)} // Met à jour l'état du pseudo
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Mot de Passe</span>
            </label>
            <input
              type="password"
              placeholder="Saisissez votre mot de passe"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe
            />
          </div>
          <div className="text-left mt-2">
            <Link
              to="/signup"
              className="text-sm hover:underline hover:text-blue-600 inline-block"
            >
              Pas de compte ?
            </Link>
          </div>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span> // Affiche un spinner pendant le chargement
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
