import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

// Middleware to verify if the user is a manager
async function verifyManager(req, res, next) {
    // Check for token in cookies
    let token;
    if (req.cookies && req.cookies.authToken) {
        token = req.cookies.authToken;
    }
    // Check for token in Authorization header
    else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // If no token is found, return an error
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    // Verify the token and check if the user is a manager
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains a valid user ID
        if (!decoded || !decoded._id) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Find the user by ID and check their role
        const user = await User.findById(decoded._id);
        if (user.role !== "manager") {
            return res
                .status(403)
                .json({ message: "Access denied: Managers only" });
        }

        // Attach the user information to the request object
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default verifyManager;
