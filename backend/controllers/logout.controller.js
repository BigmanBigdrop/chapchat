const logout = (req, res) => {
  try {
    // Supprimer le cookie JWT en le définissant avec une durée de vie expirée
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Utilisateur déconnecté avec succès" });
  } catch (error) {
    console.error("Erreur dans le contrôleur de déconnexion", error);
    res.status(500).json({ message: "Erreur lors de la déconnexion" });
  }
};

export default logout;
