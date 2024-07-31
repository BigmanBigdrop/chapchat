// Est cree chronologiquement apres le signup controller

import User from "../models/user.model.js"; // Modèle utilisateur
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const login = async (req, res) => {
  try {
    const { pseudo, password } = req.body; // Récupération du pseudo et du mot de passe du corps de la requête

    // Rechercher l'utilisateur dans la base de données par pseudo
    const user = await User.findOne({ pseudo });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si le mot de passe est correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Générer le token JWT
    const token = generateToken(user._id, res);

    // Répondre avec les détails de l'utilisateur
    res.status(200).json({
      message: "Utilisateur connecté avec succès",
      user: {
        _id: user._id,
        nomComplet: user.nomComplet,
        pseudo: user.pseudo,
        genre: user.genre,
        photoDeProfil: user.photoDeProfil,
      },
    });
  } catch (error) {
    console.error("Erreur dans le contrôleur de connexion", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export default login;
