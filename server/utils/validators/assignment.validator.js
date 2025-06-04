import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z
    .string({
        required_error: "ObjectId is required",
    })
    .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId",
    });

const assignmentValidator = z.object({
    engineerId: objectIdSchema,
    projectId: objectIdSchema,
    allocationPercentage: z
        .number()
        .min(0, { message: "Allocation must be at least 0" })
        .max(100, { message: "Allocation cannot exceed 100" }),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    role: z
        .string({ required_error: "Role is required" })
        .nonempty("Role cannot be empty"),
    status: z
        .enum(["active", "completed", "on hold"], {
            errorMap: () => ({
                message: "Status must be one of: active, completed, on hold",
            }),
        })
        .default("active"),
});

export default assignmentValidator;
