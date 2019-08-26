import React, { Component } from "react";
import UserInfo from "./UserInfo";
import ScoreCards from "./ScoreCards";
import ChartTable from "./ChartTable";

import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <UserInfo />
        <ScoreCards />
        <ChartTable />
      </div>
    );
  }
}

export default Dashboard;
