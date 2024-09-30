import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Topbar = ({ email }) => {
    return (
        <div className="topbar">
            <div className="topbar-left">
                <h2>Welcome, {email || "User"}</h2>  {/* Displays user email */}
            </div>
            <div className="topbar-right">
                <FaBell className="icon" />  {/* Notification icon */}
                <FaUserCircle className="icon" />  {/* User profile icon */}
            </div>
        </div>
    );
};

export default Topbar;
