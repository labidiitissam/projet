import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isPublisher: {
            type: Boolean,
            required: true,
            default: false
        }
    },

);

const User = mongoose.model("User", userSchema);
export default User;