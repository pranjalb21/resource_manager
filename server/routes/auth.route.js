import express from "express";
import verifyManager from "../utils/auth/verifyManager.js";
import { loginUser, logOutUser, registerUser } from "../apis/auth.api.js";
import verifyToken from "../utils/auth/verifyToken.js";

const router = express.Router();

router
    // Register route
    .post("/register", verifyManager, registerUser)
    // Login route
    .post("/login", loginUser)
    // Logout route
    .post("/logout", verifyToken, logOutUser);

export default router;
