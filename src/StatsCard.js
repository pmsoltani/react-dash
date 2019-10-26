import React, { Component } from "react";
import { Card, Tooltip, Typography } from "antd";
import { Container, Row, Col } from "react-grid-system";

const { Text, Title } = Typography;

class StatsCard extends Component {
  render() {
    return (
      <Card className="stats-card" hoverable bordered style={this.props.style}>
        <Container style={{ padding: 0 }}>
          <Row>
            <Col xs={8}>
              <Text
                type="secondary"
                style={{
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "0"
                }}
              >
                {this.props.stats.type}
              </Text>
              <Tooltip
                title={
                  <div>
                    <div>Last update:</div>
                    <div>{this.props.stats.tooltip}</div>
                  </div>
                }
                placement="topLeft"
              >
                <Title level={2} style={{ fontWeight: 700, margin: "0" }}>
                  {this.props.stats.value}
                </Title>
              </Tooltip>
            </Col>
            <Col xs={4}>
              <img
                src={this.props.stats.icon}
                height="60px"
                alt="stats card icon"
              />
            </Col>
          </Row>
        </Container>
      </Card>
    );
  }
}

export default StatsCard;
