import React, { Component } from "react";
import { Tabs, Icon } from "antd";
import UserInfo from "./UserInfo";
import ScoreCards from "./ScoreCards";
import "./Dashboard.css";
import Papers from "./Papers";
import avatar from "./assets/profile.svg"
import axios from "axios";

const { TabPane } = Tabs;

const info = {
  first: "First",
  last: "Last",
  rank: "Rank",
  department: "Name of the Department",
  institution: "Name of the Institution",
  avatar: avatar,
  contact: [
    { type: "email", address: "/", text: "first.last@some-email.com" },
    { type: "website", address: "/", text: "www.google.com" },
    { type: "scholar", address: "/", text: "www.google.com" },
    { type: "linkedin", address: "/", text: "www.linkedin.com" },
    { type: "phone", address: "", text: "+98 999 123 4567" }
  ]
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePane: "1",
      firstTime: true,
      params: {},
      papers: [],
      allPapers: []
    };

    this.handleHit = this.handleHit.bind(this);
    this.handleTabsChange = this.handleTabsChange.bind(this);
  }

  handleHit(data) {
    this.setState({ params: data });
  }

  handleTabsChange(key) {
    this.setState({ activePane: key });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.activePane === prevState.activePane &&
      this.state.params === prevState.params &&
      this.props.authorID === prevProps.authorID
    ) {
      return;
    } else if (
      this.state.activePane === "2" &&
      (this.props.authorID !== prevProps.authorID || this.state.firstTime)
    ) {
      this.fetchPapers("papers", {}, true);
      this.setState({ firstTime: false });
    }
    const key = Object.keys(this.state.params)[0];

    switch (key) {
      case "year":
        this.fetchPapers("trend", this.state.params);
        break;
      case "coID":
        this.fetchPapers("network", this.state.params);
        break;
      case "tag":
        this.fetchPapers("keywords", this.state.params);
        break;
      case "q":
        this.fetchPapers("journals", this.state.params);
        break;
      default:
        break;
    }
  }

  async fetchPapers(route, params = {}, setAllPapers = false) {
    try {
      const response = await axios.get(`/a/${this.props.authorID}/${route}`, {
        params: params
      });
      const tableData = response.data.map((value, index) => {
        return {
          key: index + 1,
          tags: [
            { key: "type", value: value.type },
            { key: "quartile", value: value.quartile },
            {
              key: "open_access",
              value: value.open_access ? "open access" : "close access"
            }
          ],
          ...value
        };
      });

      setAllPapers
        ? this.setState({ allPapers: tableData })
        : this.setState({ papers: tableData });
    } catch (e) {
      setAllPapers
        ? this.setState({ allPapers: [] })
        : this.setState({ papers: [] });
    }
  }

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
          activeKey={this.state.activePane}
          size="small"
          animated={{ tabPane: false }}
          tabPosition="top"
          className="dashboard-tabs"
          onChange={this.handleTabsChange}
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
            <ScoreCards
              authorID={this.props.authorID}
              callback={this.handleHit}
            />
            <Papers papers={this.state.papers} />
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
            <Papers papers={this.state.allPapers} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
