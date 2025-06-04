import { z } from "zod";

const userValidator = z.object({
    email: z
        .string({ required_error: "Email address is required." })
        .trim()
        .email({ message: "Invalid email address" })
        .toLowerCase(),
    password: z
        .string({ required_error: "Password is required." })
        .min(5, { message: "Password must be at least 5 characters long." }),
    name: z
        .string({ required_error: "Name is required." })
        .trim()
        .min(3, { message: "Name must be at least 3 characters long." }),
    role: z.enum(["engineer", "manager"], {
        errorMap: () => ({
            message: "Role must be either engineer or manager",
        }),
        default: "engineer".toLowerCase(),
    }),
    skills: z.array(z.string().trim().toLowerCase()).default([]),
    seniority: z
        .enum(["junior", "mid", "senior"], {
            errorMap: () => ({
                message: "Seniority must be junior, mid, or senior",
            }),
        })
        .default("junior"),
    maxCapacity: z
        .number()
        .int()
        .positive({ message: "Max capacity must be a positive integer" })
        .default(100),
    department: z
        .string()
        .min(1, { message: "Department is required" })
        .default(""),
});

export default userValidator;
