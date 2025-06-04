import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["engineer", "manager"],
            required: true,
        },
        // Engineer fields
        skills: [
            {
                type: String,
            },
        ],
        seniority: {
            type: String,
            enum: ["junior", "mid", "senior"],
            default: "junior",
        },
        maxCapacity: {
            type: Number,
            enum:[100,50],
            default: 100,
        },
        department: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
    },
    {
        timestamps: true,
    }
);
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

userSchema.pre("save", async function (next) {
    // Check if the password is modified before hashing
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) || 10);

        // Hash the password using bcrypt
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model("User", userSchema);
export default User;
