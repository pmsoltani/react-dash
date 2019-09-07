import React, { Component } from "react";
import { Row, Col, Layout, Typography, Divider } from "antd";
import "./PageFooter.css";

// import elsametricLogo from "./assets/logo.svg";
import googleMapsLogo from "./assets/google-maps.svg";
import instagramLogo from "./assets/instagram.svg";
import linkedinLogo from "./assets/linkedin.svg";
import telegramLogo from "./assets/telegram.svg";
import Logo from "./Logo";

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

class PageFooter extends Component {
  render() {
    return (
      <Footer className="footer-container">
        <Row>
          <Col xs={24} lg={6}>
            <Logo
              style={{
                fontWeight: 700,
                fontSize: "72px",
                color: "#fff",
                position: "relative",
                bottom: "40px"
              }}
            />
          </Col>

          <Col xs={24} lg={18}>
            <Row>
              <Paragraph>
                <Text code>elsametric</Text> can help you analyze the academic
                performance of researchers, departments, and universities.
              </Paragraph>
            </Row>

            <Row type="flex">
              <Col xs={24} md={16}>
                <Title level={4} type="secondary">
                  Useful links
                </Title>
                <Paragraph>
                  <ul>
                    <li>
                      <a href="/">Sharif Homepage</a>
                    </li>
                    <li>
                      <a href="/">Sharif International Affairs Office</a>
                    </li>
                    <li>
                      <a href="/">About Us</a>
                    </li>
                  </ul>
                </Paragraph>
              </Col>

              <Col xs={24} md={8}>
                <Title level={4} type="secondary">
                  Contact
                </Title>
                <Paragraph>
                  <Text type="primary">International Affairs Office</Text>
                  <br />
                  <Text type="primary">Sharif University of Technology</Text>
                  <br />
                  <Text type="primary">Azadi Ave.</Text>
                  <br />
                  <Text type="primary">Tehran, Iran</Text>
                  <br />
                  <Text type="primary">
                    <Text strong>Email: </Text>
                    <a href="/">pooria.ms@gmail.com</a>
                  </Text>
                </Paragraph>
                <Paragraph>
                  <a href="/">
                    <img
                      src={linkedinLogo}
                      alt="contact linkedin"
                      height="32px"
                    />
                  </a>
                  <Divider type="vertical" />
                  <a href="/">
                    <img
                      src={instagramLogo}
                      alt="contact instagram"
                      height="32px"
                    />
                  </a>
                  <Divider type="vertical" />
                  <a href="/">
                    <img
                      src={telegramLogo}
                      alt="contact telegram"
                      height="32px"
                    />
                  </a>
                  <Divider type="vertical" />
                  <a href="/">
                    <img
                      src={googleMapsLogo}
                      alt="contact google maps"
                      height="32px"
                    />
                  </a>
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col style={{ textAlign: "center" }}>
            © 2019 Pooria Soltani
            <Divider type="vertical" />
            <a href="/">Terms of service</a>
            <Divider type="vertical" />
            <a href="/">Privacy Policy</a>
          </Col>
        </Row>
      </Footer>
    );
  }
}

export default PageFooter;
