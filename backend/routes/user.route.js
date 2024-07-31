import express from "express";
import protectRoute from "../middleware/protectRoute.js"; // Middleware pour protéger les routes
import { getUsersForSidebar } from "../controllers/user.controller.js"; // Contrôleur pour obtenir les utilisateurs

const router = express.Router();

// Définition des routes avec protection par middleware
router.get("/", protectRoute, getUsersForSidebar);

export default router;
