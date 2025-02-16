import React from "react";
import Header from "../components/layout/Header";
import FriendsComponent from "../components/friends/FriendsComponent";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard-container">
        {/* Left Navbar Column */}
        <div className="dashboard-left">
          {/* Add left nav content here */}
          <div>Logo</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        {/* Main Content Column */}
        <main className="dashboard-main">
          <h2>Welcome to Your Dashboard</h2>
          <p>
            Here you can manage your projects and collaborate with others.
          </p>
          {/* Additional main content */}
        </main>
        {/* Friends Sidebar Column */}
        <aside className="dashboard-friends">
          <FriendsComponent />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
