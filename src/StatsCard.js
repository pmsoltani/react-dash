import React, { Component } from "react";
import { Card, Typography } from "antd";
import { Container, Row, Col } from "react-grid-system";

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

const { Text, Title } = Typography;

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

class StatsCard extends Component {
  render() {
    console.log(this.props.stats);
    return (
      <Card
        hoverable
        bordered
        style={{
          width: "300px",
          margin: "auto",
          marginTop: "8px",
          marginBottom: "8px"
        }}
        size="default"
      >
        <Container className="container1" style={{ padding: 0 }}>
          <Row className="row1">
            <Col className="col1">
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
            <Col xs="content" className="col2">
              <img src={this.props.stats.icon} height="60px" alt="card-icon" />
            </Col>
          </Row>
        </Container>
      </Card>
    );
  }
}

export default StatsCard;
