import React, { Component } from "react";
import { Row, Col, Icon, Card, Tabs } from "antd";
import Elevation from "./Elevation";
import "./ScoreCards.css";
import AmChordChart from "./AmChordChart";
// import AmSparkBar from "./AmSparkBar";
// import AmSparkLine from "./AmSparkLine";
import AmMixedChart from "./AmMixedChart";
import AmWordCloud from "./AmWordCloud";
import CardsGrid from "./CardsGrid";

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
            <Card hoverable>
              <Tabs
                defaultActiveKey="1"
                size="small"
                animated={{ tabPane: false }}
                // tabPosition="left"
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
        </Col>

        <Col xs={24} lg={8}>
          <CardsGrid />
        </Col>
      </Row>
    );
  }
}

export default ScoreCards;
