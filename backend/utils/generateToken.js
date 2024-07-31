//Notre ticket de securite pour avoir acces a toute partie de l'application

import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  // Génération du token JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3h", // Le token expirera dans 3 heures
  });

  // Envoi du token JWT au client via un cookie
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // Le cookie expirera dans 2 heures
    httpOnly: true, // Le cookie est accessible uniquement via HTTP, pas par JavaScript côté client
    secure: process.env.NODE_ENV === "production", // Le cookie est sécurisé (utilisé seulement en HTTPS) si l'application est en mode production
  });
};

export default generateToken;
