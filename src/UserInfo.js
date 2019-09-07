import React, { Component } from "react";
import { Typography, List, Avatar, Modal, Button, Icon, Popover } from "antd";
import "./UserInfo.css";
import { Container, Row, Col } from "react-grid-system";

// import profile from "./assets/profile.svg";
import linkedinLogo from "./assets/linkedin.svg";
import emailLogo from "./assets/email.svg";
import phoneLogo from "./assets/phone.svg";
import googleLogo from "./assets/google.svg";
import websiteLogo from "./assets/website.svg";

const { Title, Text } = Typography;

const contactIcons = {
  email: emailLogo ,
  website: websiteLogo ,
  scholar: googleLogo ,
  linkedin: linkedinLogo ,
  phone: phoneLogo
};

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactModal: false,
      contactInfo: this.props.contactInfo.map(item => ({
        ...item,
        icon: contactIcons[item.type]
      }))
    };
  }

  showModal = () => {
    this.setState({
      showContactModal: true
    });
  };

  handleCancel = e => {
    this.setState({
      showContactModal: false
    });
  };

  popMessage = (
    <div>
      <Text type="warning">
        <Icon type="tool" />
        <span style={{ marginLeft: "8px" }}>Under Construction!</span>
      </Text>
    </div>
  );

  render() {
    return (
      <Container fluid className="user-info-container">
        <Row
          style={{
            justifyContent: "space-between"
          }}
        >
          <Col>
            <Row>
              <Col xs="content" style={{ paddingLeft: 0 }}>
                <Avatar
                  size={120}
                  icon="user"
                  src={this.props.avatar}
                  style={{
                    border: "3px solid #fff",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, .4)"
                  }}
                  id="profile-picture"
                />
              </Col>
              <Col xs={12} md={6}>
                <Title level={2}>
                  <span className="first-name">{this.props.first}</span>
                  <span> </span>
                  <span
                    className="last-name"
                    style={{ textTransform: "uppercase" }}
                  >
                    {this.props.last}
                  </span>
                </Title>
                {this.props.rank}
                <br />
                <Text>
                  <a href="/">{this.props.department}</a>
                </Text>
                <br />
                <Text>
                  <a href="/">{this.props.institution}</a>
                </Text>
              </Col>
            </Row>
          </Col>
          <Col sm={12} md="content" style={{ paddingRight: 0 }}>
            <Button type="primary" icon="info-circle" onClick={this.showModal}>
              Contact Info
            </Button>
            <br />
            <br />
            <Popover placement="left" content={this.popMessage} trigger="click">
              <Button type="default" icon="edit">
                Suggest Edit
              </Button>
            </Popover>

            <Modal
              title="Contact"
              visible={this.state.showContactModal}
              onCancel={this.handleCancel}
              closable
              footer={null}
            >
              <List
                dataSource={this.state.contactInfo}
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
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserInfo;
