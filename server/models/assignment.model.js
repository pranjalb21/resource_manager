import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        engineerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Engineer",
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Project",
        },
        allocationPercentage: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        role: {
            type: String,
            required: true,
            enum: ["Developer", "Tech Lead", "Manager", "QA", "Other"],
        },
        status: {
            type: String,
            enum: ["active", "completed", "on hold"],
            default: "active",
        },

    },
    {
        timestamps: true,
    }
);
const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
