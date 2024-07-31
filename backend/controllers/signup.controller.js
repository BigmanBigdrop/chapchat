//Normalement c'est le premier controller a creer selon le modèle défini

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // hasher les mots de passe
import generateToken from "../utils/generateToken.js"; // Fonction pour générer des tokens JWT

const signup = async (req, res, next) => {
  try {
    // Valider les données d'entrée
    const { nomComplet, pseudo, password, confirmPassword, genre } = req.body;

    if (!nomComplet || !pseudo || !password || !confirmPassword || !genre) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message:
          "Le mot de passe et la confirmation du mot de passe ne correspondent pas",
      });
    }

    const existingUser = await User.findOne({ pseudo }); // Vérifier si l'utilisateur existe déjà

    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Générer l'URL de la photo de profil
    const profilePicUrl =
      genre === "Homme"
        ? `https://avatar.iran.liara.run/public/boy?pseudo=${pseudo}`
        : `https://avatar.iran.liara.run/public/girl?pseudo=${pseudo}`;

    // Créer un nouvel objet utilisateur
    const newUser = new User({
      nomComplet,
      pseudo,
      password: hashedPassword,
      genre,
      photoDeProfil: profilePicUrl,
    });

    // Sauvegarder l'utilisateur dans la base de données
    if (newUser) {
      // Générer le token JWT
      generateToken(newUser._id, res);
      await newUser.save();
    } else {
      return res
        .status(500)
        .json({ message: "Données de l'utilisateur invalides" });
    }

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        _id: newUser._id,
        nomComplet: newUser.nomComplet,
        pseudo: newUser.pseudo,
        genre: newUser.genre,
        photoDeProfil: newUser.photoDeProfil,
      },
    });
  } catch (error) {
    console.error("Erreur dans le contrôleur d'inscription", error);
    next(error); // Passer l'erreur au middleware de gestion des erreurs
  }
};

export default signup;
