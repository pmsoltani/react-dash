// libraries
import React, { Component } from "react";
import { Tabs, Icon } from "antd";
import axios from "axios";

// components
import Papers from "./Papers";
import ScoreCards from "./ScoreCards";
import UserInfo from "./UserInfo";

// other assets
import "./Dashboard.css";

const { TabPane } = Tabs;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePane: "1",
      firstTime: true, // 'Publications' tab has not been activated yet
      params: {}, // lifted from one of the chart components
      papers: [], // list of papers to be shown when a chart element is clicked
      allPapers: [], // list of all papers of an author, for the publications tab
      papersLoading: false // loading indicator for the 'Papers' component
    };

    this.handleHit = this.handleHit.bind(this);
    this.handleTabsChange = this.handleTabsChange.bind(this);
  }

  handleHit(data) {
    // Handles the lifted state from one of the chart components, when the user
    // clicks on a chart element, such as a bar on 'AmMixedChart'. The received
    // data is in one of the following formats:
    // { year: 2013 } ---> from 'AmMixedChart'
    // { coID: wejfb13-14v } ---> from 'AmChordChart'
    // { keyword: "computing" } ---> from 'AmWordCloud'
    // { metric: "q3" } ---> from 'AmPieChart'
    // { metric: "p79" } ---> from 'AmSunburstChart'

    this.setState({ params: data });
  }

  handleTabsChange(key) {
    // Controls the state of the 'Tabs' component from Ant Design.
    this.setState({ activePane: key });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.activePane === prevState.activePane &&
      this.state.params === prevState.params &&
      this.props.authorID === prevProps.authorID
    ) {
      // the case when nothing new has happend!
      return;
    } else if (
      this.state.activePane === "2" &&
      (this.props.authorID !== prevProps.authorID || this.state.firstTime)
    ) {
      // when the 'Publications' tab is activated for the first time, or another
      // author is selected
      this.fetchPapers("papers", {}, true);
      this.setState({ firstTime: false });
    } else if (this.state.params !== prevState.params) {
      // when a chart element is clicked
      this.fetchPapers(this.state.params);
    }
  }

  async fetchPapers(params = {}, setAllPapers = false) {
    // Fetches papers data from the specified endpoint of the API, using the
    // 'route' and 'params' arguments. Then submits the data to be shown in the
    // 'Papers' component (either the one in the 'Dashboard' tab, or the one in
    // the 'Publications' tab, using the 'setAllPapers' argument).

    // 1. enable the table's 'loading' indicator
    this.setState({ papersLoading: true });

    try {
      // 2. fetch the data from a certain API endpoint
      const response = await axios.get(`/a/${this.props.authorID}/papers`, {
        params: params
      });

      // 3. re-shape the received data to be shown by 'Papers' component
      const tableData = response.data.map((paper, idx) => ({
        key: idx + 1, // used both by React and the index column of the table
        tags: [
          { key: "type", value: paper.typeDescription },
          { key: "quartile", value: paper.quartile },
          {
            key: "open_access",
            value: paper.open_access ? "open access" : "close access"
          }
        ],
        ...paper
      }));

      tableData.map(paper =>
        paper.authors
          .filter(author => author.idFrontend === this.props.authorID)
          .map(author => (author.bold = true))
      );

      // 4. submit the data to the state, to be shown by 'Papers' component
      setAllPapers
        ? this.setState({ allPapers: tableData })
        : this.setState({ papers: tableData });
    } catch (e) {
      setAllPapers
        ? this.setState({ allPapers: [] })
        : this.setState({ papers: [] });
    }

    // 5. disable the table's 'loading' indicator
    this.setState({ papersLoading: false });
  }

  render() {
    return (
      <div className="dashboard-container">
        <UserInfo authorID={this.props.authorID} />
        <Tabs
          defaultActiveKey="1"
          activeKey={this.state.activePane}
          onChange={this.handleTabsChange}
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
            <Papers
              papers={this.state.papers}
              loading={this.state.papersLoading}
            />
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
            <Papers
              papers={this.state.allPapers}
              loading={this.state.papersLoading}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
