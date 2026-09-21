import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    hashPassword: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    refreshToken: {
        type: String,
    }
})

const userModel = mongoose.model('users', userSchema);

export default userModel;