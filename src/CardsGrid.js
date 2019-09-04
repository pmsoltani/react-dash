import React, { Component } from "react";
import { Icon, Card, Typography } from "antd";
import "./CardsGrid.css";
import AmSparkBar from "./AmSparkBar";
import AmSparkLine from "./AmSparkLine";

const { Title, Text } = Typography;

class CardsGrid extends Component {
  render() {
    return (
      <div className="grid-container">
        <div className="row-container">
          <Card hoverable className="card papers">
            <Title level={2}>16</Title>
            <Text>papers this year</Text>
            <AmSparkBar />
          </Card>

          <Card hoverable className="card citations">
            <Title level={2}>386</Title>
            <Text>papers this year</Text>
            <AmSparkLine />
          </Card>

          <Card hoverable className="card national">
            <Title level={2}>5</Title>
            <Text>national collaborators</Text>
          </Card>
        </div>

        <div className="row-container">
          <Card hoverable className="card international">
            <Title level={2}>3</Title>
            <Text>international collaborators</Text>
          </Card>
        </div>
      </div>
    );
	}
}

export default CardsGrid;
