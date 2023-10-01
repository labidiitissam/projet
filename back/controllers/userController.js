import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { jwt_key, expireDate } from "../baseUrl.js";

// @Desc Authenticate user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                firstname: user.firstname,
                lastName: user.lastname,
                email:user.email,
                isPublisher:user.isPublisher,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ Message: "Informations Invalids" });
        }
    } catch (err) {
        res.status(500).json({ Message: "server Error" });
    }
};



// @Desc register new User
const register = async (req, res) => {
    try {
        // Get user data from the request body
        const { firstname,
            lastname,
            email,
            phoneNumber,
            password,
            isPublisher } = req.body;

        // Check if the user with the provided email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "L’utilisateur existe déjà avec cet e-mail." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance using the User model
        const newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phoneNumber: phoneNumber,
            password: hashedPassword,
            isPublisher: isPublisher
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with the created user
        res.status(201).json({
            firstname: savedUser.firstname,
            lastName: savedUser.lastname,
            isPublisher:savedUser.isPublisher,
            token: generateToken(savedUser._id),
        });
    } catch (error) {
        // Handle any errors that occurred during the creation process
        res.status(500).json({ error: "Failed to create the user." });
    }
};


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, jwt_key, {
        expiresIn: expireDate,
    });
};


export { login, register };