import React, { Component } from "react";
import { Card, Typography } from "antd";
import { Container, Row, Col } from "react-grid-system";

const { Text, Title } = Typography;

class StatsCard extends Component {
  render() {
    return (
      <Card
        hoverable
        bordered
        style={this.props.style}
        size="default"
      >
        <Container className="container1" style={{ padding: 0 }}>
          <Row className="row1">
            <Col xs={8} className="col1">
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
              <Title
                level={2}
                style={{ color: "#000", fontWeight: 700, margin: "0" }}
              >
                {this.props.stats.value}
              </Title>
            </Col>
            <Col xs={4} className="col2">
              <img src={this.props.stats.icon} height="60px" alt="card-icon" />
            </Col>
          </Row>
        </Container>
      </Card>
    );
  }
}

export default StatsCard;
