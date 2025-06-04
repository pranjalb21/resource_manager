import express from "express";
import Project from "../models/project.model.js";
import verifyManager from "../utils/auth/verifyManager.js";
import projectValidator from "../utils/validators/project.validator.js";
import mongoose from "mongoose";
import {
    createProjectByManager,
    deleteProjectByManager,
    getAllProjectsByManager,
    getProjectById,
    updateProjectByManager,
} from "../apis/project.api.js";
import verifyToken from "../utils/auth/verifyToken.js";

const router = express.Router();

router
    .get("/", verifyManager, getAllProjectsByManager)
    .post("/", verifyManager, createProjectByManager)
    .get("/:projectId", verifyManager, getProjectById)
    .patch("/:projectId", verifyManager, updateProjectByManager)
    .delete("/:projectId", verifyManager, deleteProjectByManager);
export default router;
