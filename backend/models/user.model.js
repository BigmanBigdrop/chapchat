//Premier modele a creer (Les controlleurs d'auth en dependent)

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nomComplet: {
      type: String,
      required: true,
    },
    pseudo: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },
    genre: {
      type: String,
      enum: ["Homme", "Femme"],
      required: true,
    },
    photoDeProfil: {
      type: String,
      default: "" /* "default_profile_pic.png" */,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
