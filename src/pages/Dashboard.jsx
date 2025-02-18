import React from "react";
import Header from "../components/layout/Header";
import FriendsComponent from "../components/friends/FriendsComponent";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-left">
          <div>Logo</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <main className="dashboard-main">
          <h2>Welcome to Your Dashboard</h2>
          <p>Here you can manage your projects and collaborate with others.</p>
        </main>
        <aside className="dashboard-friends">
          <FriendsComponent />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
