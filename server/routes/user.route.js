import express from "express";
import User from "../models/user.model.js";
import userValidator from "../utils/validators/user.validator.js";
import jwt from "jsonwebtoken";
import verifyManager from "../utils/auth/verifyManager.js";
import verifyToken from "../utils/auth/verifyToken.js";
import { ZodError } from "zod";
import {
    deleteUserByManager,
    getAllUsersByManager,
    getUserById,
    getUserOwnProfile,
    updateUserProfileByManager,
    updateUserSkills,
} from "../apis/user.api.js";

const router = express.Router();

router
    // All users route
    .get("/", verifyManager, getAllUsersByManager)
    // User profile routes
    .get("/profile/me", verifyToken, getUserOwnProfile)
    .get("/profile/:userId", verifyManager, getUserById)
    // User profile update routes
    .patch("/profile/password", verifyToken)
    .patch("/profile/skills", verifyToken, updateUserSkills)
    .patch("/profile/:userId", verifyManager, updateUserProfileByManager)
    // Delete user by manager
    .delete("/profile/:userId", verifyManager, deleteUserByManager);

export default router;
