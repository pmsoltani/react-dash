import React, { Component } from "react";
import { Icon, Card, Tabs, Typography } from "antd";
import { Container, Row, Col } from "react-grid-system";
import "./ScoreCards.css";
import AmMixedChart from "./AmMixedChart";
import AmChordChart from "./AmChordChart";
import AmWordCloud from "./AmWordCloud";
import AmPieChart from "./AmPieChart";
import AmSparkBar from "./AmSparkBar";
import AmSparkLine from "./AmSparkLine";


const { Title, Text } = Typography;
const { TabPane } = Tabs;
const chartStyles = {
  width: "100%",
  height: "300px"
}

// const sparkStyles = {
//   height: "100px",
//   width: "100px",
//   margin: "15px -15px 0px -15px",
// };

class ScoreCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sparkStyles: {
        height: "72px",
        width: "200px",
        // margin: "24x -24px 0px -24px"
      },
    };

    this.handleHit = this.handleHit.bind(this);
  }

  handleHit(data) {
    this.props.callback(data)
  }

  render() {
    return (
      <Container fluid className="container score-cards">
        <Row gutterWidth={16} className="cards-row">
          <Col xs={8}>
            <Card hoverable>
              <Tabs
                defaultActiveKey="1"
                size="small"
                animated={{ tabPane: false }}
                tabPosition="left"
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

          <Col xs={4} className="cards-grid">
            <Row className="cards-grid-row">
              <Col>
                <Card hoverable bordered={false} className="score-card papers">
                  <Row nogutter style={{ justifyContent: "space-between" }}>
                    <Col xs="content">
                      <AmSparkBar style={this.state.sparkStyles} />
                    </Col>
                    <Col xs={4}>
                      <Title level={2}>16</Title>
                      <Text>papers this year</Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row className="cards-grid-row">
              <Col>
                <Card
                  hoverable
                  bordered={false}
                  className="score-card citations"
                >
                  <Row nogutter style={{ justifyContent: "space-between" }}>
                    <Col xs="content">
                      <AmSparkLine style={this.state.sparkStyles} />
                    </Col>
                    <Col xs={4}>
                      <Title level={2}>386</Title>
                      <Text>citations this year</Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row className="cards-grid-row">
              <Col>
                <Card
                  hoverable
                  bordered={false}
                  className="score-card national"
                >
                  <Row nogutter style={{ justifyContent: "space-between" }}>
                    <Col xs="content"></Col>
                    <Col xs={4}>
                      <Title level={2}>5</Title>
                      <Text>nat. collaborators</Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            {/* <Row>
              <Col>
                <Card
                  hoverable
                  bordered={false}
                  className="score-card international"
                >
                  <Row nogutter style={{ justifyContent: "space-between" }}>
                    <Col xs="content"></Col>
                    <Col xs={4}>
                      <Title level={2}>3</Title>
                      <Text>int. collaborators</Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ScoreCards;
