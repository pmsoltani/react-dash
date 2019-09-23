import React, { Component } from "react";
import { Tabs, Icon } from "antd";
import UserInfo from "./UserInfo";
import ScoreCards from "./ScoreCards";
// import ChartTable from "./ChartTable";
import "./Dashboard.css";
import Papers from "./Papers";
import avatar from "./assets/pooria.jpg"

const { TabPane } = Tabs;

const info = {
  first: "Pooria",
  last: "Soltani",
  rank: "Associate Professor",
  department: "Department of Chemical Engineering",
  institution: "Sharif University of Technology",
  avatar: avatar,
  contact: [
    { type: "email", address: "/", text: "pooria.ms@gmail.com" },
    { type: "website", address: "/", text: "sharif.edu/~pmsoltani" },
    { type: "scholar", address: "/", text: "www.google.com" },
    { type: "linkedin", address: "/", text: "linkedin.com/in/pmsoltani" },
    { type: "phone", address: "", text: "+98 939 137 0620" }
  ]
};


class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <UserInfo
          first={info.first}
          last={info.last}
          rank={info.rank}
          avatar={info.avatar}
          department={info.department}
          institution={info.institution}
          contactInfo={info.contact}
          authorID={this.props.authorID}
        />
        <Tabs
          defaultActiveKey="1"
          size="small"
          animated={{ tabPane: false }}
          tabPosition="top"
          className="dashboard-tabs"
        >
          <TabPane
            tab={
              <span>
                <Icon type="dashboard" />
                Dashboard
              </span>
            }
            key="1"
          >
            <ScoreCards authorID={this.props.authorID} />
            <Papers authorID={this.props.authorID} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="book" />
                Publications
              </span>
            }
            key="2"
          >
            <Papers />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
