import React, { Component } from "react";
import UserInfo from "./UserInfo";
import ScoreCards from "./ScoreCards";
import AmBarChart from "./AmBarChart";

import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <UserInfo />
        <ScoreCards />
        <AmBarChart />
      </div>
    );
  }
}

export default Dashboard;
