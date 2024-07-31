import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // ID de l'utilisateur connecté

    // Rechercher tous les utilisateurs sauf l'utilisateur connecté et exclure le mot de passe des résultats
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(
      "Erreur dans le contrôleur getUsersForSidebar",
      error.message
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
