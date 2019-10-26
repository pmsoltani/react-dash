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
import singleAuthorIcon from "./assets/singleAuthor.svg";
import natCollabIcon from "./assets/natCollaboration.svg";
import intlCollabIcon from "./assets/intlCollaboration.svg";
import instCollabIcon from "./assets/instCollaboration.svg";

const { TabPane } = Tabs;
const chartStyles = { width: "100%", height: "300px" };
const tabs = [
  { text: "Summary", icon: <Icon type="bar-chart" />, content: AmMixedChart },
  { text: "Collaborations", icon: <Icon type="team" />, content: AmChordChart },
  { text: "Keywords", icon: <Icon type="tags" />, content: AmWordCloud },
  { text: "Journals", icon: <Icon type="pie-chart" />, content: AmPieChart }
];
const statsCardsMapper = {
  totalPapers: { type: "Total Papers", icon: papersIcon },
  totalCitations: { type: "Total Citations", icon: citationsIcon },
  article: { type: "Journal Papers", icon: articleIcon },
  conference: { type: "Conf. Papers", icon: conferencePaperIcon },
  review: { type: "Review Papers", icon: reviewIcon },
  book: { type: "Books", icon: bookIcon },
  singleAuthorship: { type: "Single Authorships", icon: singleAuthorIcon },
  instCollaboration: { type: "Inst. Collaborations", icon: instCollabIcon },
  natCollaboration: { type: "Nat. Collaborations", icon: natCollabIcon },
  intlCollaboration: { type: "Intl. Collaborations", icon: intlCollabIcon }
};
const statsCardsSkipKeys = [
  "hIndex",
  "i10Index",
  "retrievalTime",
  "thisYearPapers",
  "thisYearCitations",
  "other"
];

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
    if (prevProps.authorID !== this.props.authorID) {
      this.fetchAuthorStats();
    } else if (this.state.activePane !== prevState.activePane) {
      this.handleStatsCards();
    }
  }

  async fetchAuthorStats() {
    try {
      // 1. fetch the data from API
      const response = await axios.get(`/a/${this.props.authorID}/stats`);

      // 2. re-shape the data
      let stats = {};
      for (let key of Object.keys(response.data)) {
        if (statsCardsSkipKeys.includes(key)) continue;
        stats[key] = [];
        for (let innerKey of Object.keys(response.data[key])) {
          if (statsCardsSkipKeys.includes(innerKey)) continue;
          stats[key].push({
            type: statsCardsMapper[innerKey].type,
            value: response.data[key][innerKey],
            tooltip: response.data[key].retrievalTime.split("T")[0],
            icon: statsCardsMapper[innerKey].icon
          });
        }
      }

      // 3. setting the state and calling 'handleStatsCards' to display the data
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
    if (activePane === "1") {
      items = this.state.stats.papers; // summary tab
    } else if (activePane === "2") {
      items = this.state.stats.collaborations; // collaborators tab
    } else if (activePane === "3") {
      items = []; // keywords TAB
    } else {
      items = this.state.stats.paperTypes; // journals TAB
    }
    if (!items) {
      items = [];
    }
    for (let item of items) {
      cards = [
        ...cards,
        <Col lg="content">
          <StatsCard
            stats={item}
            style={{
              width: "260px",
              marginBottom: "16px"
            }}
          />
        </Col>
      ];
    }
    this.setState({ statsCards: cards });
  }

  render() {
    const tabPanes = tabs.map((tab, index) => {
      const Component = tab.content;
      return (
        <TabPane
          tab={
            <>
              {tab.icon}
              {tab.text}
            </>
          }
          key={String(index + 1)}
        >
          <Component
            style={chartStyles}
            authorID={this.props.authorID}
            callback={this.handleHit}
          />
        </TabPane>
      );
    });

    return (
      <Container fluid className="container score-cards">
        <Row gutterWidth={16} className="cards-row">
          <Col xs={12} lg={9}>
            <Card hoverable>
              <Tabs
                defaultActiveKey={this.state.activePane}
                size="small"
                animated={{ tabPane: false }}
                tabPosition="left"
                onChange={this.handleTabsChange}
              >
                {tabPanes}
              </Tabs>
            </Card>
          </Col>

          <Col xs={12} lg={3} className="cards-grid">
            <Row gutterWidth={16}>{this.state.statsCards}</Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ScoreCards;
