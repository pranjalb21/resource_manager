import { ZodError } from "zod";
import User from "../models/user.model.js";
import userValidator from "../utils/validators/user.validator.js";
import jwt from "jsonwebtoken";

// Function to log out user
export const logOutUser = async (req, res) => {
    try {
        // Clear the auth token cookie
        res.clearCookie("authToken");
        res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        console.log("Error occurred during logout:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to log in user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Email and password are required." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ error: "Invalid email or password." });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        // Compare passwords (assuming plain text for now)
        if (!isPasswordCorrect) {
            return res
                .status(401)
                .json({ error: "Invalid email or password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Respond with success and user info (omit password)
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            skills: user.skills,
            seniority: user.seniority,
            maxCapacity: user.maxCapacity,
            department: user.department,
        };
        res.status(200).cookie("authToken", token).json({
            message: "Login successful",
            data: userData,
            token,
        });
    } catch (error) {
        console.log("Error occurred during login:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to register a new user
export const registerUser = async (req, res) => {
    try {
        // Validate request body using Zod schema
        const parsedBody = userValidator.parse(req.body);

        const existingUser = await User.findOne({ email: parsedBody.email });
        console.log(existingUser);

        if (existingUser) {
            return res
                .status(409)
                .json({ error: "User with this email already exists." });
        }

        // Create a new user instance
        const newUser = new User(parsedBody);

        // Save the new user to the database
        await newUser.save();
        console.log(newUser);

        // Respond with success message and user data
        res.status(201).json({
            message: "User registered successfully. Please login.",
            data: newUser,
        });
    } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
            let errorMessage = error.errors.map((err) => err.message);

            return res.status(400).json({ error: errorMessage });
        }
        console.log("Error occured while fetching all users:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};
