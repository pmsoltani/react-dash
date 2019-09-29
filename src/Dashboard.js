import React, { Component } from "react";
import { Tabs, Icon } from "antd";
import UserInfo from "./UserInfo";
import ScoreCards from "./ScoreCards";
import "./Dashboard.css";
import Papers from "./Papers";
import avatar from "./assets/pooria.jpg";
import axios from "axios";

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
  constructor(props) {
    super(props);

    this.state = {
      params: {},
      papers: [],
      allPapers: []
    };

    this.handleHit = this.handleHit.bind(this);
  }

  handleHit(data) {
    this.setState({ params: data });
  }

  // componentDidMount() {
  //   this.fetchPapers("papers", {}, true);
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.params === prevState.params) {
      return;
    }
    const key = Object.keys(this.state.params)[0];

    this.fetchPapers("papers", {}, true);

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
