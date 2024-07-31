import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controller.js"; // Contrôleurs pour envoyer et recevoir des messages
import protectRoute from "../middleware/protectRoute.js"; // Middleware pour protéger les routes

const router = express.Router();

// Définition des routes avec protection par middleware
router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
