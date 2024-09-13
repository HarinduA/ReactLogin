import React from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();
    const { email } = location.state || {};  // Extract email from state

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Welcome to the Dashboard</h2>
            <p>You have logged in with the email: <strong>{email}</strong></p>
        </div>
    );
};

export default Dashboard;
