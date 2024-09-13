import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';  

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that email and password are provided
        if (!email || !password) {
            alert("Email and password are required.");
            return;
        }

        try {
            console.log("Attempting to log in with email:", email); // Log the attempt

            // Call the backend API to save email and password in SQL Server
            const response = await axios.post("http://localhost:3000/api/login", {
                email: email,
                password: password
            });

            console.log("API response:", response.data); // Log API response

            // Check if the login was successful
            if (response.data.success) {
                console.log("Login successful, navigating to dashboard"); // Log success
                // Navigate to the dashboard and pass the email
                navigate("/dashboard", { state: { email: email } });
            } else {
                console.log("Login failed:", response.data.message); // Log failure
                alert(`Login failed: ${response.data.message}`);
            }
        } catch (error) {
            console.error("There was an error logging in:", error);
            alert("An error occurred while logging in. Please try again later.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
