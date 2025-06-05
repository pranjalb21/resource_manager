import express from "express";
import Assignment from "../models/assignment.model.js";
import verifyManager from "../utils/auth/verifyManager.js";
import assignmentValidator from "../utils/validators/assignment.validator.js";
import verifyToken from "../utils/auth/verifyToken.js";
import {
    createAssignmentByManager,
    deleteAssignmentById,
    getAllAssignmentsByManager,
    getAssignmentByIdByEngineer,
    getAssignmentsByengineer,
    getAssignmentsByproject,
    updateAssgnmentStatusByEngineer,
    updateAssignmentByIdByManager,
} from "../apis/assignment.api.js";

const router = express.Router();

// GET /assignments
router
    .get("/project/:project", verifyManager, getAssignmentsByproject)
    .get("/:assignmentId/engineer", verifyToken, getAssignmentByIdByEngineer)
    .get("/engineer/me", verifyToken, getAssignmentsByengineer)
    .get("/", verifyManager, getAllAssignmentsByManager)
    .post("/", verifyManager, createAssignmentByManager)
    .patch("/:id", verifyManager, updateAssignmentByIdByManager)
    .delete("/:id", verifyManager, deleteAssignmentById)
    .patch(
        "/:assignmentId/engineer/status",
        verifyToken,
        updateAssgnmentStatusByEngineer
    );

export default router;
