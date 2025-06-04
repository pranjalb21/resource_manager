import express from "express";
import Assignment from "../models/assignment.model.js";
import verifyManager from "../utils/auth/verifyManager.js";
import assignmentValidator from "../utils/validators/assignment.validator.js";
import verifyEngineer from "../utils/auth/verifyEngineer.js";
import verifyToken from "../utils/auth/verifyToken.js";
import {
    createAssignmentByManager,
    deleteAssignmentById,
    getAllAssignmentsByManager,
    getAssignmentByIdByEngineer,
    getAssignmentsByEngineerId,
    getAssignmentsByProjectId,
    updateAssgnmentStatusByEngineer,
    updateAssignmentByIdByManager,
} from "../apis/assignment.api.js";

const router = express.Router();

// GET /assignments
router
    .get("/", verifyManager, getAllAssignmentsByManager)
    .post("/", verifyManager, createAssignmentByManager)
    .patch("/:id", verifyManager, updateAssignmentByIdByManager)
    .delete("/:id", verifyManager, deleteAssignmentById)
    .get("/project/:projectId", verifyManager, getAssignmentsByProjectId)
    .get("/:assignmentId/engineer", verifyToken, getAssignmentByIdByEngineer)
    .patch(
        "/:assignmentId/engineer/status",
        verifyToken,
        updateAssgnmentStatusByEngineer
    )
    .get("/engineer/me", verifyToken, getAssignmentsByEngineerId);

export default router;
