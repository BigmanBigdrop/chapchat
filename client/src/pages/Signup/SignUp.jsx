import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox"; // Composant pour choisir le genre
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup"; // Hook personnalisé pour l'inscription

const SignUp = () => {
  const [inputs, setInputs] = useState({
    nomComplet: "",
    pseudo: "",
    password: "",
    confirmPassword: "",
    genre: "",
  });

  const { loading, signup } = useSignup(); // Appel du hook pour l'inscription

  const handleCheckboxChange = (genre) => {
    setInputs({ ...inputs, genre }); // Met à jour le genre sélectionné
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    await signup(inputs); // Appelle la fonction d'inscription avec les données du formulaire
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Inscription <span className="text-blue-500">CHAPCHAT</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Nom Complet</span>
            </label>
            <input
              type="text"
              placeholder="Jean Pierre Kakou"
              className="w-full input input-bordered h-10"
              value={inputs.nomComplet}
              onChange={
                (e) => setInputs({ ...inputs, nomComplet: e.target.value }) // Met à jour le nom complet
              }
            />
          </div>
          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Pseudo</span>
            </label>
            <input
              type="text"
              placeholder="jeanpierre123"
              className="w-full input input-bordered h-10"
              value={inputs.pseudo}
              onChange={(e) => setInputs({ ...inputs, pseudo: e.target.value })} // Met à jour le pseudo
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="Saisissez votre mot de passe"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={
                (e) => setInputs({ ...inputs, password: e.target.value }) // Met à jour le mot de passe
              }
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">
                Confirmer le Mot de Passe
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={
                (e) => setInputs({ ...inputs, confirmPassword: e.target.value }) // Met à jour la confirmation du mot de passe
              }
            />
          </div>
          <GenderCheckbox
            selectedGender={inputs.genre}
            onCheckboxChange={handleCheckboxChange} // Passe la fonction de gestion du changement de genre au composant enfant
          />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Vous avez déja un compte?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span> // Affiche un spinner pendant le chargement
              ) : (
                "S'inscrire"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
