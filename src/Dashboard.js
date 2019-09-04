import React, { Component } from "react";
import UserInfo from "./UserInfo";
import ScoreCards from "./ScoreCards";
import ChartTable from "./ChartTable";

import "./Dashboard.css";
import { Divider } from "antd";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <UserInfo />
        <Divider style={{height: "2px"}} />
        <ScoreCards />
        <ChartTable />
      </div>
    );
  }
}

export default Dashboard;
