import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        requiredSkills: [
            {
                type: String,
            },
        ],
        teamSize: {
            type: Number,
            required: true,
            min: 1,
        },
        status: {
            type: String,
            enum: ["planning", "active", "completed"],
            default: "planning",
        },
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);
const Project = mongoose.model("Project", projectSchema);
export default Project;
