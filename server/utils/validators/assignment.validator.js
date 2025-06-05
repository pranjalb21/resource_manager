import { optional, z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z
    .string({
        required_error: "ObjectId is required",
    })
    .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId",
    });

const assignmentValidator = z.object({
    engineer: objectIdSchema,
    project: objectIdSchema,
    allocationPercentage: z
        .number()
        .min(0, { message: "Allocation must be at least 0" })
        .max(100, { message: "Allocation cannot exceed 100" }),
    startDate: z.coerce.date().default(() => new Date()),
    endDate: z.coerce.date().optional(),
    role: z
        .string({ required_error: "Role is required" })
        .nonempty("Role cannot be empty"),
    status: z
        .enum(["active", "completed", "on hold"], {
            required_error: "Status is required",
            invalid_type_error: "Invalid status",
            invalid_enum_value_error:
                'Status must be one of: ["active", "completed", "on hold"]',
        })
        .default("active"),
    name: z
        .string({ required_error: "Name is required" })
        .nonempty("Name cannot be empty"),
    description: z
        .string({ required_error: "Description is required" })
        .nonempty("Description cannot be empty"),
    role: z
        .enum(["Developer", "Tech Lead", "Manager", "QA", "Other"], {
            required_error: "Status is required",
            invalid_type_error: "Invalid status",
            invalid_enum_value_error:
                'Status must be one of: ["Developer", "Tech Lead", "Manager", "QA", "Other"]',
        })
        .default("Developer"),
});

export default assignmentValidator;
