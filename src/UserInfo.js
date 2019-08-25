import React, { Component } from "react";
import { Row, Col, Typography, List, Avatar } from "antd";
import Elevation from "./Elevation";
import "./UserInfo.css";

// import profile from "./assets/profile.svg";
import linkedinLogo from "./assets/linkedin.svg";
import emailLogo from "./assets/email.svg";
import phoneLogo from "./assets/phone.svg";
import googleLogo from "./assets/google.svg";
import websiteLogo from "./assets/website.svg";
import pooria from "./assets/pooria.jpg"

const { Title, Text } = Typography;

const contactInfo = [
  { type: "email", address: "/", icon: emailLogo, text: "pooria.ms@gmail.com" },
  {
    type: "website",
    address: "/",
    icon: websiteLogo,
    text: "sharif.edu/~pmsoltani"
  },
  { type: "scholar", address: "/", icon: googleLogo, text: "www.google.com" },
  {
    type: "linkedin",
    address: "/",
    icon: linkedinLogo,
    text: "linkedin.com/in/pmsoltani"
  },
  { type: "phone", address: "", icon: phoneLogo, text: "+98 939 137 0620" }
];

class UserInfo extends Component {
  render() {
    return (
      <div className="user-info-container">
        <Row type="flex" justify="center">
          <Col xs={20} className="user-info">
            <Elevation
              depth={1}
              styles={{
                borderRadius: "10px",
                padding: "24px",
                backgroundColor: "#fff"
              }}
            >
              <Row type="flex" justify="center" className="general-info">
                <Col xs={24} lg={4}>
                  <Avatar size={120} icon="user" src={pooria} shape="square" />
                </Col>
                <Col xs={24} lg={8}>
                  <Title level={2}>Pooria Soltani</Title>
                  Associate Professor
                  <br />
                  <Text>
                    <a href="/">Department of Chemical Engineering</a>
                  </Text>
                  <br />
                  <Text>
                    <a href="/">Sharif University of Technology</a>
                  </Text>
                </Col>
                <Col xs={24} lg={4} />
                <Col xs={24} lg={8} style={{ flexGrow: 2, textAlign: "right" }}>
                  <List
                    dataSource={contactInfo}
                    renderItem={item => (
                      <List.Item
                        style={{
                          borderBottom: 0,
                          padding: 0,
                          paddingBottom: "6px"
                        }}
                      >
                        <a href={item.address}>
                          <List.Item.Meta
                            avatar={<Avatar src={item.icon} />}
                            title={item.text}
                          />
                        </a>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Elevation>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserInfo;
