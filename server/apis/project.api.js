import projectValidator from "../utils/validators/project.validator.js";
import mongoose from "mongoose";
import Project from "../models/project.model.js";

export const deleteProjectByManager = async (req, res) => {
    try {
        // Validate the project ID
        if (!req.params.project) {
            return res.status(400).send("Project ID is required");
        }

        // Check if the project ID is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(req.params.project)) {
            return res.status(400).send("Invalid Project ID");
        }

        // Delete the project by ID
        const deletedProject = await Project.findByIdAndDelete(
            req.params.project
        );

        // Check if the project was found and deleted
        if (!deletedProject) {
            return res.status(404).send("Project not found");
        }

        // Respond with a success message
        res.json({
            message: "Project deleted successfully",
            data: deletedProject,
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).send("Internal Server Error");
    }
};
export const updateProjectByManager = async (req, res) => {
    try {
        // Validate the project ID
        if (!req.params.project) {
            return res.status(400).send("Project ID is required");
        }

        // Check if the project ID is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(req.params.project)) {
            return res.status(400).send("Invalid Project ID");
        }

        // Validate the request body using the projectValidator
        if (!req.body) {
            return res.status(400).send("Request body is required");
        }
        const parsedBody = projectValidator.parse(req.body);

        // Update the project with the new data
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.project,
            parsedBody,
            { new: true }
        );

        // Check if the project was found and updated
        if (!updatedProject) {
            return res.status(404).send("Project not found");
        }

        // Respond with the updated project
        res.json({
            message: "Project updated successfully",
            data: updatedProject,
        });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getProjectById = async (req, res) => {
    try {
        // Validate the project ID
        if (!req.params.project) {
            return res.status(400).send("Project ID is required");
        }

        // Check if the project ID is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(req.params.project)) {
            return res.status(400).send("Invalid Project ID");
        }

        // Fetch the project by ID
        const project = await Project.findById(req.params.project);

        // Check if the project exists
        if (!project) {
            return res.status(404).send("Project not found");
        }

        // Respond with the project details
        res.json({
            message: "Project fetched successfully",
            data: project,
        });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const createProjectByManager = async (req, res) => {
    try {
        // Validate the request body using the projectValidator
        if (!req.body) {
            return res.status(400).send("Request body is required");
        }
        const parsedBody = projectValidator.parse(req.body);

        // Create a new project instance
        const newProject = new Project({
            name: parsedBody.name,
            description: parsedBody.description,
            startDate: parsedBody.startDate,
            endDate: parsedBody.endDate,
            requiredSkills: parsedBody.requiredSkills,
            teamSize: parsedBody.teamSize,
            status: parsedBody.status,
            managerId: req.user._id,
        });

        // Save the new project to the database
        await newProject.save();

        // Respond with the created project
        res.status(201).json({
            message: "Project created successfully",
            data: newProject,
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getAllProjectsByManager = async (req, res) => {
    try {
        // Fetch all projects from the database
        const projects = await Project.find();

        // Check if projects exist
        if (!projects || projects.length === 0) {
            return res.status(404).send("No projects found");
        }

        // Return the list of projects
        res.status(200).json({
            message: "Projects fetched successfully",
            data: projects,
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send("Internal Server Error");
    }
};
