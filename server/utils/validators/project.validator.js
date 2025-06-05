import { z } from "zod";
import { Types } from "mongoose";

// Validator for project creation
const projectValidator = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .nonempty("Name cannot be empty"),
    description: z
        .string({ required_error: "Description is required" })
        .default(""),
    startDate: z.coerce.date({
        required_error: "Start date is required",
        invalid_type_error: "Invalid start date",
    }),
    endDate: z.date().optional(),
    requiredSkills: z.array(
        z
            .string({ required_error: "Skill is required" })
            .min(1, "Skill cannot be empty"),
        { required_error: "Required skills are required" }
    ),
    teamSize: z
        .number({ required_error: "Team size is required" })
        .int()
        .positive("Team size must be a positive integer"),
    status: z.enum(["planning", "active", "completed"], {
        required_error: "Status is required",
        invalid_type_error: "Invalid status",
        invalid_enum_value_error:
            "Status must be one of: planning, active, completed",
    }),
});

export default projectValidator;
