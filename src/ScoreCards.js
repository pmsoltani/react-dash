import React, { Component } from "react";
import { Icon, Card, Tabs } from "antd";
import { Container, Row, Col } from "react-grid-system";
import "./ScoreCards.css";
import AmMixedChart from "./AmMixedChart";
import AmChordChart from "./AmChordChart";
import AmWordCloud from "./AmWordCloud";
import AmPieChart from "./AmPieChart";
import StatsCard from "./StatsCard";

import citations from "./assets/citations.svg";
import papers from "./assets/papers.svg";
import article from "./assets/article.svg";
import review from "./assets/review.svg";
import conferencePaper from "./assets/conferencePaper.svg";
import book from "./assets/book.svg";
import singleAuthor from "./assets/singleAuthor.svg";
import natCollaboration from "./assets/natCollaboration.svg";
import intlCollaboration from "./assets/intlCollaboration.svg";
import instCollaboration from "./assets/instCollaboration.svg";

const { TabPane } = Tabs;
const chartStyles = {
  width: "100%",
  height: "300px"
};

const stats = [
  { type: "Total Papers", value: 15, icon: papers },
  { type: "Total Citations", value: 43, icon: citations },
  { type: "Journal Papers", value: 5, icon: article },
  {
    type: "Conference Papers",
    value: 7,
    icon: conferencePaper
  },
  { type: "Review Papers", value: 2, icon: review },
  { type: "Books", value: 1, icon: book },
  { type: "Single Authorship", value: 2, icon: singleAuthor },
  {
    type: "Inst. Collaboration",
    value: 8,
    icon: instCollaboration
  },
  {
    type: "Nat. Collaboration",
    value: 1,
    icon: natCollaboration
  },
  {
    type: "Intl. Collaboration",
    value: 4,
    icon: intlCollaboration
  }
];

class ScoreCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePane: "2",
      statsCards: [],
      sparkStyles: {
        height: "72px",
        width: "200px"
        // margin: "24x -24px 0px -24px"
      }
    };

    this.handleHit = this.handleHit.bind(this);
    this.handleTabsChange = this.handleTabsChange.bind(this);
  }

  componentDidMount() {
    this.handleStatsCards();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activePane === prevState.activePane) {
      return;
    }
    console.log("@didupdate", this.state);
    this.handleStatsCards();
  }

  handleHit(data) {
    this.props.callback(data);
  }

  handleTabsChange(key) {
    this.setState({ activePane: key });
  }

  handleStatsCards() {
    console.log("@statscards", this.state);
    let items;
    let cards = [];
    if (this.state.activePane === "1") {
      console.log("@1");
      items = [stats[0], stats[1]];
    } else if (this.state.activePane === "2") {
      console.log("@2");
      items = [stats[6], stats[7], stats[8], stats[9]];
    } else if (this.state.activePane === "3") {
      console.log("@3");
      items = [];
    } else {
      console.log("@else");
      items = [stats[2], stats[3], stats[4], stats[5]];
    }
    console.log("items", items);
    for (let item of items) {
      cards = [
        ...cards,
        // <Row>
        <Col  lg="content" className="hibye" >
          <StatsCard stats={item} />
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
            <Row gutterWidth={16} >{this.state.statsCards}</Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ScoreCards;
