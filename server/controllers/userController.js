// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
// const User = require("../modals/userModel");
// require("dotenv").config();

// const registerUser = asyncHandler(async (req, res) => {
//     console.log("Inside registerUser function"); // Debugging log
//     const { firstName, lastName, age, gender, email, phoneNumber, password } = req.body;

//     if (!firstName || !lastName || !age || !gender || !email || !phoneNumber || !password) {
//         res.status(400);
//         throw new Error("Please fill all fields");
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         return res.status(400).json({ message: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await User.create({
//         firstName,
//         lastName,
//         age,
//         gender,
//         email,
//         phoneNumber,
//         password: hashedPassword,
//     });

//     res.status(201).json({ message: "User registered successfully", user: newUser });
// });

// const loginUser = asyncHandler(async (req, res) => {
//     console.log("Inside loginUser function"); // Debugging log
//     const { email, password } = req.body;

//     if (!email || !password) {
//         res.status(400);
//         throw new Error("Please fill all fields");
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//         return res.status(400).json({ message: "Password did not match" });
//     }

//     res.status(200).json({
//         message: "Login successful",
//         user: {
//             id: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             age: user.age,
//             gender: user.gender,
//         },
//     });
// });

// module.exports = { registerUser , loginUser};



const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../modals/userModel");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age, gender,  email, phoneNumber, password } = req.body;

    // Validate all required fields
    if (!firstName || !lastName || !age || !gender || !email || !phoneNumber || !password) {
        console.log("Validation failed: missing fields");
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        console.log(`User with email ${email} already exists`);
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
        firstName,
        lastName,
        age,
        gender,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    console.log("User registered successfully:", newUser);
    res.status(201).json({ message: "User registered successfully", user: newUser });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Login failed: missing email or password");
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
        console.log(`User with email ${email} not found`);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        console.log("Password did not match for user:", email);
        return res.status(400).json({ message: "Password did not match" });
    }

    console.log("User logged in successfully:", user);
    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            age: user.age,
            gender: user.gender,
        },
    });
});

module.exports = { registerUser, loginUser };