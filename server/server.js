// Framework Configuration
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const hbs = require('hbs');
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");

// Initialize environment variables
dotenv.config();

// Connect to the database
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON and handle form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configure static folder for file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Configure view engine and views path
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', 'hbs');

// Define Routes
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Basic test route
app.get('/', (req, res) => {
    res.send("working");
});

// Dynamic home route
app.get('/home', (req, res) => {
    res.render("home", {
        title: "Dynamic Home Page",
        message: "Welcome to the dynamic home page!",
        user: { name: "PARAM", age: 19 }
    });
});

// All users route with mock data
app.get('/allusers', (req, res) => {
    const users = [
        { name: "XYZ", age: 30, email: "xyz@example.com", role: "Admin" },
        { name: "ABC", age: 25, email: "abc@example.com", role: "User" },
        { name: "PQR", age: 28, email: "pqr@example.com", role: "Moderator" }
    ];
    res.render('users', { users });
});

// File upload route
app.post("/profile", upload.single("avatar"), function(req, res) {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    console.log(req.body);
    console.log(req.file);

    const fileName = req.file.filename;
    const imageUrl = `/uploads/${fileName}`;
    return res.render("home", { imageUrl: imageUrl });
});

// Error handling middleware (placed after routes)
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
