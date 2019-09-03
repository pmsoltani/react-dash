import React, { Component } from "react";
import { Row, Col, Card, Tabs, Typography } from "antd";
import Elevation from "./Elevation";
import "./ScoreCards.css";
import AmSparkBar from "./AmSparkBar";
import AmChordChart from "./AmChordChart";
import AmSparkLine from "./AmSparkLine";
import AmMixedChart from "./AmMixedChart";
import AmWordCloud from "./AmWordCloud";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const styles = {
  width: "100%",
  height: "300px"
}

class ScoreCards extends Component {
  render() {
    return (
      <div className="cards-container">
        <Row type="flex" justify="center" className="cards-row">
          <Col xs={24} lg={16}>
            <Tabs defaultActiveKey="1" size="small" animated={{ tabPane: false }}>
              <TabPane tab="Tab 1" key="1">
                <AmMixedChart styles={styles} />
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                <AmChordChart styles={styles} />
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                <AmWordCloud styles={styles} />
              </TabPane>
            </Tabs>
          </Col>
          <Col
            xs={24}
            lg={2}
            style={{ marginTop:"40px", borderRadius: 0, height: "200px" }}
            className="card papers"
          >
            <Title level={2}>16</Title>
            <Text>papers this year</Text>
            <AmSparkBar />
          </Col>
          <Col
            xs={24}
            lg={2}
            style={{ marginTop:"40px", borderRadius: 0, height: "200px" }}
            className="card citations"
          >
            <Title level={2}>386</Title>
            <Text>papers this year</Text>
            <AmSparkLine />
          </Col>
          <Col
            xs={24}
            lg={2}
            style={{ marginTop:"40px", borderRadius: 0, height: "200px" }}
            className="card national"
          >
            <Title level={2}>5</Title>
            <Text>national collaborators</Text>
          </Col>
          <Col
            xs={24}
            lg={2}
            style={{ marginTop:"40px", borderRadius: 0, height: "200px" }}
            className="card international"
          >
            <Title level={2}>3</Title>
            <Text>international collaborators</Text>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ScoreCards;
