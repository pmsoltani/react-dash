import React, { Component } from "react";
import { Row, Col, Icon, Card, Tabs, Typography } from "antd";
import Elevation from "./Elevation";
import "./ScoreCards.css";
import AmSparkBar from "./AmSparkBar";
import AmChordChart from "./AmChordChart";
import AmSparkLine from "./AmSparkLine";
import AmMixedChart from "./AmMixedChart";
import AmWordCloud from "./AmWordCloud";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const chartStyles = {
  width: "100%",
  height: "300px"
}

class ScoreCards extends Component {
  render() {
    return (
      <Row type="flex" justify="center" gutter={16} className="cards-row">
        <Col xs={24} lg={16}>
          <Elevation depth={1}>
            <Card>
              <Tabs
                defaultActiveKey="1"
                size="small"
                animated={{ tabPane: false }}
              >
                <TabPane
                  tab={
                    <span>
                      <Icon type="pie-chart" />
                      Summary
                    </span>
                  }
                  key="1"
                >
                  <AmMixedChart styles={chartStyles} />
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
                  <AmChordChart styles={chartStyles} />
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
                  <AmWordCloud styles={chartStyles} />
                </TabPane>
              </Tabs>
            </Card>
          </Elevation>
        </Col>

        <Col xs={24} lg={8}>
          <Row type="flex">
            <Col
              xs={24}
              lg={12}
              style={{ borderRadius: 0, height: "100%" }}
              className="card papers"
            >
              <Card hoverable>
                <Title level={2}>16</Title>
                <Text>papers this year</Text>
                <AmSparkBar />
              </Card>
            </Col>
            <Col
              xs={24}
              lg={12}
              style={{ borderRadius: 0, height: "100%" }}
              className="card citations"
            >
              <Card hoverable>
                <Title level={2}>386</Title>
                <Text>papers this year</Text>
                <AmSparkLine />
              </Card>
            </Col>
          </Row>

          <Row type="flex">
            <Col
              xs={24}
              lg={12}
              style={{ borderRadius: 0, height: "100%" }}
              className="card national"
            >
              <Card hoverable>
                <Title level={2}>5</Title>
                <Text>national collaborators</Text>
              </Card>
            </Col>
            <Col
              xs={24}
              lg={12}
              style={{ borderRadius: 0, height: "100%" }}
              className="card international"
            >
              <Card hoverable>
                <Title level={2}>3</Title>
                <Text>international collaborators</Text>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default ScoreCards;
