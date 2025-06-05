import User from "../models/user.model.js";
import userValidator from "../utils/validators/user.validator.js";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import express from "express";
import mongoose from "mongoose";

// Function to delete a user by manager
export const deleteUserByManager = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        // Check if userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid User ID." });
        }

        // Check if requested user is the same as the logged-in user
        if (req.user._id.toString() === userId) {
            return res.status(403).json({
                error: "You cannot delete your own account.",
            });
        }

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({
            message: "User deleted successfully.",
            data: deletedUser,
        });
    } catch (error) {
        console.log("Error occurred while deleting user:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to update user profile by manager
export const updateUserProfileByManager = async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        // Only allow updating allowed fields
        const allowedFields = [
            "name",
            "email",
            "role",
            "skills",
            "seniority",
            "maxCapacity",
            "department",
        ];
        const predefinedRoles = ["engineer", "manager"];
        // Validate role if provided
        if (updateData.role && !predefinedRoles.includes(updateData.role)) {
            return res.status(400).json({
                error: `Role must be one of the following: ${predefinedRoles.join(
                    ", "
                )}`,
            });
        }

        const predefinedSeniorities = ["junior", "mid", "senior"];
        // Validate seniority if provided
        if (
            updateData.seniority &&
            !predefinedSeniorities.includes(updateData.seniority)
        ) {
            return res.status(400).json({
                error: `Seniority must be one of the following: ${predefinedSeniorities.join(
                    ", "
                )}`,
            });
        }

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid User ID." });
        }

        // Filter updateData to only include allowed fields
        const filteredData = {};
        for (const key of allowedFields) {
            if (updateData[key] !== undefined) {
                filteredData[key] = updateData[key];
            }
        }

        const predefinedMaxCapacities = [100, 50];
        // Validate maxCapacity if provided
        if (
            updateData.maxCapacity &&
            !predefinedMaxCapacities.includes(updateData.maxCapacity)
        ) {
            return res.status(400).json({
                error: `Max capacity must be one of the following: ${predefinedMaxCapacities.join(
                    ", "
                )}`,
            });
        }

        // Handle password reset if provided
        let updatedUser;
        if (updateData.password) {
            updatedUser = await User.findById(userId);
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found." });
            }
            updatedUser.password = updateData.password;
            Object.assign(updatedUser, filteredData);
            await updatedUser.save();
            updatedUser = await User.findById(userId).select("-password");
        } else {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: filteredData },
                { new: true }
            ).select("-password");
        }

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({
            message: "User updated successfully.",
            data: updatedUser,
        });
    } catch (error) {
        console.log("Error occurred while updating user:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to update user skills by engineer
export const updateUserSkills = async (req, res) => {
    try {
        const { skills } = req.body;

        // Get user from request object (set by verifyToken middleware)
        const user = req.user;

        // Find user by ID
        const foundUser = await User.findById(user._id);
        if (!foundUser) {
            return res.status(404).json({ error: "User not found." });
        }

        // Only allow updating skills if engineer
        if (foundUser.role === "engineer" && Array.isArray(skills)) {
            foundUser.skills = skills;
        }

        await foundUser.save();

        res.status(200).json({
            message: "Profile updated successfully.",
            data: foundUser,
        });
    } catch (error) {
        console.log("Error occurred while updating profile:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to update user password
export const updateUserPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Validate request body
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                error: "Old password and new password are required.",
            });
        }

        // Check if new password and old password are the same
        if (oldPassword === newPassword) {
            return res.status(400).json({
                error: "New password must be different from old password.",
            });
        }

        // Validate new password length
        if (newPassword.length < 5) {
            return res.status(400).json({
                error: "New password must be at least 5 characters long.",
            });
        }

        // Get user from request object (set by verifyToken middleware)
        const user = req.user;

        // Find user by ID
        const foundUser = await User.findById(user._id);
        if (!foundUser) {
            return res.status(404).json({ error: "User not found." });
        }
        // Check if old password matches
        const isPasswordCorrect = await foundUser.comparePassword(oldPassword);
        if (!isPasswordCorrect) {
            return res
                .status(401)
                .json({ error: "Old password is incorrect." });
        }

        foundUser.password = newPassword;
        await foundUser.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.log("Error occurred while updating password:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to get user details by ID
export const getUserById = async (req, res) => {
    try {
        // Get userId from request parameters
        if (!req.params || !req.params.userId) {
            return res.status(400).json({ error: "User ID is required." });
        }
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        // Validate userId
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid User ID." });
        }

        // Fetch user details from the database
        const userDetails = await User.findById(userId).select("-password");
        if (!userDetails) {
            return res.status(404).json({ error: "User not found." });
        }

        // Respond with user details
        res.status(200).json({
            message: "User fetched successfully",
            data: userDetails,
        });
    } catch (error) {
        console.log("Error occurred while fetching user:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to get user profile
export const getUserOwnProfile = async (req, res) => {
    try {
        // Get user from request object (set by verifyToken middleware)
        const user = req.user;

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Fetch user details from the database
        const userDetails = await User.findById(user._id).select("-password");
        if (!userDetails) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({
            message: "User fetched successfully",
            data: userDetails,
        });
    } catch (error) {
        console.log("Error occurred while fetching user:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to get all users
export const getAllUsersByManager = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({ role: "engineer" });

        // Check if users array is empty
        if (!(users.length > 0)) {
            return res.status(400).json({ error: "No users found." });
        }

        // Respond with success message and users data
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        console.log("Error occured while fetching all users:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};
