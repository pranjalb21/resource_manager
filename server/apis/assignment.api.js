import assignmentValidator from "../utils/validators/assignment.validator.js";
import Assignment from "../models/assignment.model.js";

export const getAssignmentsByEngineerId = async (req, res) => {
    try {
        // Ensure the user is an engineer
        if (req.user.role !== "engineer") {
            return res.status(403).json({ error: "Access denied" });
        }

        // Fetch assignments for the logged-in engineer
        const assignments = await Assignment.find({ engineerId: req.user._id });

        // Check if assignments exist for the engineer
        if (!assignments || assignments.length === 0) {
            return res
                .status(404)
                .json({ message: "No assignments found for this user" });
        }

        // Respond with the engineer's assignments
        res.status(200).json({
            message: "Assignments fetched successfully",
            data: assignments,
        });
    } catch (err) {
        console.error("Error fetching user's assignments:", err);
        res.status(500).send("Internal Server Error");
    }
};

export const updateAssgnmentStatusByEngineer = async (req, res) => {
    try {
        // Check if the provided assignment ID is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(req.params.assignmentId)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }

        // Validate if the status is provided in the request body
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: "Status is required" });
        }

        // Check if the status is one of the allowed values
        if (!["active", "completed", "on hold"].includes(status)) {
            return res.status(400).json({
                error: "Status must be one of: active, completed, on hold",
            });
        }

        // Ensure the engineer is authorized
        if (
            req.user.role !== "engineer" ||
            req.user._id.toString() !==
                (
                    await Assignment.findById(req.params.assignmentId)
                ).engineerId.toString()
        ) {
            return res.status(403).json({ error: "Access denied" });
        }

        // Update the assignment status in the database
        const assignment = await Assignment.findOneAndUpdate(
            { _id: req.params.assignmentId, engineerId: req.user._id },
            { status },
            { new: true }
        );

        // Check if the assignment was found and updated
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        // Respond with the updated assignment
        res.json({
            message: "Assignment status updated successfully",
            data: assignment,
        });
    } catch (err) {
        console.error("Error updating assignment status:", err);
        res.status(500).send("Internal Server Error");
    }
};

export const getAssignmentByIdByEngineer = async (req, res) => {
    try {
        // Check if the provided assignment ID is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(req.params.assignmentId)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }

        // Fetch the assignment by ID
        const assignment = await Assignment.findById(req.params.assignmentId);

        // Check if the assignment exists
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        // Check if the user is an engineer and has access to this assignment
        if (
            req.user.role !== "engineer" ||
            req.user._id.toString() !== assignment.engineerId.toString()
        ) {
            return res.status(403).json({ error: "Access denied" });
        }

        // Respond with the assignment details
        res.status(200).json({
            message: "Assignment fetched successfully",
            data: assignment,
        });
    } catch (err) {
        console.error("Error fetching assignment:", err);
        res.status(500).send("Internal Server Error");
    }
};

export const getAssignmentsByProjectId = async (req, res) => {
    try {
        // Check if the projectId is provided
        if (!req.params.projectId) {
            return res.status(400).json({ error: "Project ID is required" });
        }
        const { projectId } = req.params;

        // Validate the projectId is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(projectId)) {
            return res.status(400).json({ error: "Invalid project ID" });
        }

        // Fetch assignments by projectId
        const assignments = await Assignment.find({ projectId });

        // Check if assignments exist for the given projectId
        if (!assignments || assignments.length === 0) {
            return res
                .status(404)
                .json({ message: "No assignments found for this project" });
        }

        // Respond with the assignments
        res.status(200).json({
            message: "Assignments fetched successfully",
            data: assignments,
        });
    } catch (err) {
        console.error("Error fetching assignments by projectId:", err);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteAssignmentById = async (req, res) => {
    try {
        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }

        // Fetch and delete the assignment by ID
        const assignment = await Assignment.findByIdAndDelete(req.params.id);

        // Check if the assignment was found and deleted
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        // Respond with a success message
        res.status(200).json({
            message: "Assignment deleted successfully",
        });
    } catch (err) {
        console.error("Error deleting assignment:", err);
        res.status(500).send("Internal Server Error");
    }
};

export const updateAssignmentByIdByManager = async (req, res) => {
    try {
        // Validate the request body using the assignmentValidator
        const parsedBody = assignmentValidator.parse(req.body);

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }

        // Update the assignment in the database
        const assignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            parsedBody,
            { new: true }
        );

        // Check if the assignment was found and updated
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        // Respond with the updated assignment
        res.json({
            message: "Assignment updated successfully",
            data: assignment,
        });
    } catch (err) {
        console.error("Error updating assignment:", err);
        res.status(500).send("Internal Server Error");
    }
};

export const createAssignmentByManager = async (req, res) => {
    try {
        // Validate the request body using the assignmentValidator
        const parsedBody = assignmentValidator.parse(req.body);

        // Create a new assignment instance
        const assignment = new Assignment(parsedBody);

        // Save the assignment to the database
        await assignment.save();

        // Respond with the created assignment
        res.status(201).json({
            message: "Assignment created successfully",
            data: assignment,
        });
    } catch (err) {
        console.error("Error creating assignment:", err);
        res.status(500).send("Internal Server Error");
    }
};

export const getAllAssignmentsByManager = async (req, res) => {
    try {
        // Fetch all assignments from the database
        const assignments = await Assignment.find();

        // Check if assignments exist
        if (!assignments || assignments.length === 0) {
            return res.status(404).json({ message: "No assignments found" });
        }

        // Respond with the assignments
        res.status(200).json({
            message: "Assignments fetched successfully",
            data: assignments,
        });
    } catch (err) {
        console.error("Error fetching assignments:", err);
        res.status(500).send("Internal Server Error");
    }
};
