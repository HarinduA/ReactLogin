// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// SQL Server Configuration
const dbConfig = {
    user: "SA",
    password: "MyOwnDemo123Pwd",
    server: "localhost",  // Use localhost or IP of SQL server
    port: 1433,  // Specify port separately
    database: "compulin1",
    options: {
        encrypt: false, // Set to false for local development
        trustServerCertificate: true, // Required for self-signed certificates on local dev
    },
};

// Connect to SQL Server
sql.connect(dbConfig)
    .then(() => {
        console.log("Connected to SQL Server!");
    })
    .catch(err => {
        console.error("SQL connection error: ", err);
    });

// API Route for Login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    console.log("Received login request with email:", email); // Add logging for debug

    if (!email || !password) {
        console.log("Email or password missing");  // Log missing fields
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        // Use parameterized queries to avoid SQL injection attacks
        const request = new sql.Request();
        const query = `INSERT INTO Users (email, password) VALUES (@email, @password)`;
        request.input('email', sql.NVarChar, email);
        request.input('password', sql.NVarChar, password);
        
        await request.query(query);  // Insert into SQL Server
        
        console.log("User successfully inserted into database"); // Success message
        res.json({ success: true, message: "Login successful!" });
    } catch (error) {
        console.error("Error inserting user into SQL: ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
