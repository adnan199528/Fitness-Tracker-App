import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>Welcome back, [User]!</p>
      </header>

      <section className="dashboard-main">
        <div className="dashboard-overview">
          <h2>Fitness Journey Overview</h2>
          {/* Placeholder for overview content */}
        </div>

        <div className="dashboard-recent-workouts">
          <h3>Recent Workouts</h3>
          {/* Placeholder for recent workouts */}
        </div>

        <div className="dashboard-nutrition-logs">
          <h3>Nutrition Logs</h3>
          {/* Placeholder for nutrition logs */}
        </div>

        <div className="dashboard-progress">
          <h3>Fitness Progress</h3>
          {/* Placeholder for fitness progress */}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;