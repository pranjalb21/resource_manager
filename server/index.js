// Import necessary modules
import initializeDB from "./utils/db/db.connect.js";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routers
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import projectRouter from "./routes/project.route.js";
import assignmentRouter from "./routes/assignment.route.js";

// Dotenv configuration
dotenv.config();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Initialize the database connection
initializeDB();

// Default route to check if the server is running
app.get("/", async (req, res) => {
    res.status(200).json({ message: "Welcome to RM application." });
});

// Register the user and project routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/assignments", assignmentRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
