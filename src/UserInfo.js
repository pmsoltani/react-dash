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
import scopusLogo from "./assets/scopus.svg";
import avatar from "./assets/profile.svg";
import axios from "axios";

const { Title, Text } = Typography;

const contactIcons = {
  email: emailLogo,
  website: websiteLogo,
  scholar: googleLogo,
  linkedin: linkedinLogo,
  phone: phoneLogo,
  scopus: scopusLogo
};

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorInfo: {
        first: "",
        last: "",
        rank: "",
        departments: "",
        institution: ""
      },
      showContactModal: false,
      contactInfo: this.props.contactInfo.map(item => ({
        ...item,
        icon: contactIcons[item.type]
      }))
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.authorID !== prevProps.authorID) {
      console.log("UserInfo: made api call");
      this.fetchAuthorInfo();
    }
  }

  async fetchAuthorInfo() {
    try {
      const response = await axios.get(`/a/${this.props.authorID}`);
      const authorInfo = {
        first: response.data.first,
        last: response.data.last,
        rank: "",
        department: response.data.departments[0].name,
        institution: response.data.institution.name,
        contact: response.data.contact
      };

      authorInfo.contact.forEach(item => {
        let contactType = item.type.toLowerCase();
        let iconType = Object.keys(contactIcons).filter(
          icon => contactType.indexOf(icon) >= 0
        );
        item.icon = contactIcons[iconType];
        if (contactType.indexOf("email") >= 0) {
          item.text = item.address;
          item.address = `mailto:${item.address}`;
        } else if (contactType.indexOf("phone") >= 0) {
          item.text = item.address;
          item.address = null;
        } else if (contactType.indexOf("scholar") >= 0) {
          item.text = "Google Scholar";
        } else if (contactType.indexOf("scopus") >= 0) {
          item.text = item.type;
        } else if (contactType.indexOf("website") >= 0) {
          item.text = item.type;
        }
      });

      this.setState({
        authorInfo: authorInfo
      });
    } catch (e) {
      console.log(e);
      this.setState({ authorInfo: {} });
    }
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
                  src={avatar}
                  style={{
                    border: "3px solid #fff",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, .4)"
                  }}
                  id="profile-picture"
                />
              </Col>
              <Col xs={12} md={6}>
                <Title level={2}>
                  <span className="first-name">
                    {this.state.authorInfo.first}
                  </span>
                  <span> </span>
                  <span
                    className="last-name"
                    style={{ textTransform: "uppercase" }}
                  >
                    {this.state.authorInfo.last}
                  </span>
                </Title>
                {this.state.authorInfo.rank}
                <br />
                <Text>
                  <a href="/">{this.state.authorInfo.department}</a>
                </Text>
                <br />
                <Text>
                  <a href="/">{this.state.authorInfo.institution}</a>
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
                dataSource={this.state.authorInfo.contact}
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
