//Ce middleware protège les routes en vérifiant le token JWT(Modele du ticket)

import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Importation du modèle User

const protectRoute = async (req, res, next) => {
  try {
    // Récupération du token JWT depuis les cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Pas authorizé - Aucun token de sécurité fourni" });
    }

    // Vérification du token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Pas authorisé - Token de sécurité invalide" });
    }

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }

    // Ajout de l'utilisateur à la requête pour une utilisation ultérieure
    req.user = user;
    next();
  } catch (error) {
    console.error(
      "Erreur dans le middleware de protection des routes:",
      error.message
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la protection des routes" });
  }
};

export default protectRoute;
