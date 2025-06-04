import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

const verifyToken = async (req, res, next) => {
    let token;

    // Check for token in cookies
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

    if (!token) {
        return res
            .status(401)
            .json({ message: "No token provided, authorization denied." });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains a valid user ID
        if (!decoded || !decoded._id) {
            return res
                .status(401)
                .json({ message: "Invalid token, authorization denied." });
        }

        // Find the user by ID
        const user = await User.findById(decoded._id);

        // If user is not found, return an error
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not found, authorization denied." });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid." });
    }
};

export default verifyToken;
