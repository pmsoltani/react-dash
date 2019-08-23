import React, { Component } from "react";
import { Input, Layout, Menu, Row, Col, Icon } from "antd";
import Logo from "./Logo"
import smallLogo from "./assets/wieldySmallLogo.png";
import profile from "./assets/profile.svg"

import "./PageHeader.css";

const { Header } = Layout;
const { Search } = Input;

const headerHeight = "40px"

class PageHeader extends Component {
  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <div className="header-container">
        <div className="header-news">
          A new version will be released on December 25th. Stay tuned!
        </div>
        <Header>
          <Row type="flex">
            <Col xs={0} className="side-menu-icon">
              <Icon type="menu" />
            </Col>

            <Col xs={0} className="small-logo-container">
              <img src={smallLogo} alt="logo" width="35px" height="18px" />
            </Col>

            <Col xs={3} className="logo-container">
              <Logo width="98px" height="18px" />
            </Col>

            <Col xs={14} className="menu-container">
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

            <Col xs={0} className="search-container">
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
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
