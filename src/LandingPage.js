import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";

import Logo from "./Logo";
import AuthorSearch from "./AuthorSearch";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  handleSearch(value) {
    this.props.onSelect(value);
  }

  handleLogoClick() {
    this.props.onClick();
  }

  render() {
    return (
      <Container fluid>
        <Row justify="center">
          <Col xs="content">
            <Logo
              style={{ fontWeight: 700, fontSize: "120px", color: "#000" }}
              onClick={this.handleLogoClick}
            />
          </Col>
        </Row>

        <Row justify="center">
          <Col xs="content">
            <AuthorSearch onSelect={this.handleSearch} style={{ width: 300 }} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LandingPage;
