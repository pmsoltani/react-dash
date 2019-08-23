import React, { Component } from "react";
import { Row, Col, Card, Typography } from "antd";
import Elevation from "./Elevation";
import "./ScoreCards.css";

const { Title, Text } = Typography;

class ScoreCards extends Component {
  render() {
    return (
      <div className="cards-container">
        <Row type="flex" gutter={32} justify="center" className="cards-row">
          <Col xs={20} lg={5} className="card-container">
            <Elevation depth={1} styles={{ borderRadius: "10px" }}>
              <Card width="100%" className="card papers">
                <Title level={2}>16</Title>
                <Text>papers this year</Text>
              </Card>
            </Elevation>
          </Col>
          <Col xs={20} lg={5} className="card-container">
            <Elevation depth={1} styles={{ borderRadius: "10px" }}>
              <Card width="100%" className="card citations">
                <Title level={2}>386</Title>
                <Text>papers this year</Text>
              </Card>
            </Elevation>
          </Col>
          <Col xs={20} lg={5} className="card-container">
            <Elevation depth={1} styles={{ borderRadius: "10px" }}>
              <Card width="100%" className="card national">
                <Title level={2}>5</Title>
                <Text>national collaborators</Text>
              </Card>
            </Elevation>
          </Col>
          <Col xs={20} lg={5} className="card-container">
            <Elevation depth={1} styles={{ borderRadius: "10px" }}>
              <Card width="100%" className="card international">
                <Title level={2}>3</Title>
                <Text>international collaborators</Text>
              </Card>
            </Elevation>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ScoreCards;
