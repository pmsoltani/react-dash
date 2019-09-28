import React, { Component } from "react";
import { Layout, Menu, Row, Col, Icon } from "antd";
import Logo from "./Logo";
import profile from "./assets/profile.svg";

import "./PageHeader.css";
import AuthorSearch from "./AuthorSearch";

const { Header } = Layout;

const headerHeight = "40px";

class PageHeader extends Component {
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
      <div className="header-container">
        <div className="header-news">{this.props.news}</div>
        <Header>
          <Row type="flex">
            <Col xs={24} sm={10} md={8} lg={5} className="logo-container">
              <Logo
                onClick={this.handleLogoClick}
                style={{ fontWeight: 700, fontSize: "48px", color: "#fff" }}
              />
            </Col>

            <Col xs={0} className="menu-container">
              <Menu mode="horizontal" className="menu" theme="light">
                <Menu.Item key="1" className="menu-item">
                  <Icon type="home" />
                  Home
                </Menu.Item>

                <Menu.Item key="2" className="menu-item">
                  <Icon type="pie-chart" />
                  Dashboard
                </Menu.Item>

                <Menu.Item key="3" className="menu-item">
                  <Icon type="team" />
                  Network
                </Menu.Item>

                <Menu.Item key="4" className="menu-item">
                  <Icon type="tags" />
                  Keywords
                </Menu.Item>

                <Menu.Item key="5" className="menu-item">
                  <Icon type="book" />
                  Publications
                </Menu.Item>
              </Menu>
            </Col>

            <Col xs={0} sm={14} md={16} lg={19} className="search-container">
              <AuthorSearch
                onSelect={this.handleSearch}
                style={{ width: 300 }}
              />
            </Col>

            <Col xs={0} className="profile-container">
              <img src={profile} alt="profile" height={headerHeight} />
            </Col>
          </Row>
        </Header>
      </div>
    );
  }
}

export default PageHeader;
