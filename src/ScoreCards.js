import React, { Component } from "react";
import { Icon, Card, Tabs } from "antd";
import { Container, Row, Col } from "react-grid-system";
import axios from "axios";
import "./ScoreCards.css";
import AmMixedChart from "./AmMixedChart";
import AmChordChart from "./AmChordChart";
import AmWordCloud from "./AmWordCloud";
import AmPieChart from "./AmPieChart";
import StatsCard from "./StatsCard";

import citationsIcon from "./assets/citations.svg";
import papersIcon from "./assets/papers.svg";
import articleIcon from "./assets/article.svg";
import reviewIcon from "./assets/review.svg";
import conferencePaperIcon from "./assets/conferencePaper.svg";
import bookIcon from "./assets/book.svg";
// import otherPapersIcon from "./assets/otherPapers.svg";
import singleAuthorshipIcon from "./assets/singleAuthor.svg";
import natCollaborationIcon from "./assets/natCollaboration.svg";
import intlCollaborationIcon from "./assets/intlCollaboration.svg";
import instCollaborationIcon from "./assets/instCollaboration.svg";

const { TabPane } = Tabs;
const chartStyles = {
  width: "100%",
  height: "300px"
};

class ScoreCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePane: "1",
      stats: {},
      statsCards: []
    };

    this.handleHit = this.handleHit.bind(this);
    this.handleTabsChange = this.handleTabsChange.bind(this);
  }

  componentDidMount() {
    this.fetchAuthorStats();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.authorID === this.props.authorID &&
      this.state.activePane === prevState.activePane
    ) {
      return;
    } else if (prevProps.authorID !== this.props.authorID) {
      console.log("@author change", prevProps.authorID, this.props.authorID);
      this.fetchAuthorStats();
    } else if (this.state.activePane !== prevState.activePane) {
      console.log("@tab change", prevState.activePane, this.state.activePane);
      this.handleStatsCards();
    }
  }

  async fetchAuthorStats() {
    try {
      // 1. fetch the data from API
      const response = await axios.get(`/a/${this.props.authorID}/stats`);
      const { papers, paperTypes, collaborations } = response.data;

      // 2. re-shape the data
      let stats = {
        papers: [
          { type: "Total Papers", value: papers.totalPapers, icon: papersIcon },
          {
            type: "Total Citations",
            value: papers.totalCitations,
            icon: citationsIcon
          }
        ],
        paperTypes: [
          {
            type: "Journal Papers",
            value: paperTypes.article || 0,
            icon: articleIcon
          },
          {
            type: "Conf. Papers",
            value: paperTypes.conferencePaper || 0,
            icon: conferencePaperIcon
          },
          {
            type: "Review Papers",
            value: paperTypes.review || 0,
            icon: reviewIcon
          },
          { type: "Books", value: paperTypes.book || 0, icon: bookIcon }
          // { type: "Other", value: paperTypes.book || 0, icon: otherPapersIcon }
        ],
        collaborations: [
          {
            type: "Single Authorships",
            value: collaborations.singleAuthorship,
            icon: singleAuthorshipIcon
          },
          {
            type: "Inst. Collaborations",
            value: collaborations.instCollaboration,
            icon: instCollaborationIcon
          },
          {
            type: "Nat. Collaborations",
            value: collaborations.natCollaboration,
            icon: natCollaborationIcon
          },
          {
            type: "Intl. Collaborations",
            value: collaborations.intlCollaboration,
            icon: intlCollaborationIcon
          }
        ]
      };

      // 3. setting the state to display the data
      this.setState({ stats: stats }, () => this.handleStatsCards());
    } catch (e) {
      this.setState({ stats: {} });
    }
  }

  handleHit(data) {
    this.props.callback(data);
  }

  handleTabsChange(key) {
    this.setState({ activePane: key }, () => {
      this.handleStatsCards();
    });
  }

  handleStatsCards() {
    const activePane = this.state.activePane;
    let items;
    let cards = [];
    console.log("@handleStatsCards", activePane);
    if (activePane === "1") {
      // summary tab
      items = this.state.stats.papers;
    } else if (activePane === "2") {
      // collaborators tab
      items = this.state.stats.collaborations;
    } else if (activePane === "3") {
      // keywords TAB
      items = [];
    } else {
      // journals TAB
      items = items = this.state.stats.paperTypes;
    }
    if (!items) {
      items = [];
    }
    for (let item of items) {
      cards = [
        ...cards,
        // <Row>
        <Col lg="content" className="hibye">
          <StatsCard
            stats={item}
            style={{
              width: "260px",
              marginBottom: "16px"
            }}
          />
        </Col>
        // </Row>
      ];
    }
    this.setState({ statsCards: cards });
  }

  render() {
    return (
      <Container fluid className="container score-cards">
        <Row gutterWidth={16} className="cards-row">
          <Col lg={8}>
            <Card hoverable>
              <Tabs
                defaultActiveKey={this.state.activePane}
                size="small"
                animated={{ tabPane: false }}
                tabPosition="left"
                onChange={this.handleTabsChange}
              >
                <TabPane
                  tab={
                    <span>
                      <Icon type="bar-chart" />
                      Summary
                    </span>
                  }
                  key="1"
                >
                  <AmMixedChart
                    style={chartStyles}
                    authorID={this.props.authorID}
                    callback={this.handleHit}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="team" />
                      Collaborators
                    </span>
                  }
                  key="2"
                >
                  <AmChordChart
                    style={chartStyles}
                    authorID={this.props.authorID}
                    callback={this.handleHit}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="tags" />
                      Keywords
                    </span>
                  }
                  key="3"
                >
                  <AmWordCloud
                    style={chartStyles}
                    authorID={this.props.authorID}
                    callback={this.handleHit}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="pie-chart" />
                      Journals
                    </span>
                  }
                  key="4"
                >
                  <AmPieChart
                    style={chartStyles}
                    authorID={this.props.authorID}
                    callback={this.handleHit}
                  />
                </TabPane>
              </Tabs>
            </Card>
          </Col>

          <Col lg={4} className="cards-grid">
            <Row gutterWidth={16}>{this.state.statsCards}</Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ScoreCards;
