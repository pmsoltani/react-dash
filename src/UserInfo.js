// libraries
import React, { Component } from "react";
import { Typography, List, Avatar, Modal, Button, Icon, Popover } from "antd";
import { Container, Row, Col } from "react-grid-system";
import axios from "axios";

// other assets
import "./UserInfo.css";
import linkedinLogo from "./assets/linkedin.svg";
import emailLogo from "./assets/email.svg";
import phoneLogo from "./assets/phone.svg";
import googleLogo from "./assets/google.svg";
import websiteLogo from "./assets/website.svg";
import scopusLogo from "./assets/scopus.svg";
import avatarMale from "./assets/profile-male.svg";
import avatarFemale from "./assets/profile-female.svg";

const { Title, Text } = Typography;

// used to add icons and appropriate texts to each contact
const contactMapper = {
  email: { icon: emailLogo, text: "" },
  website: { icon: websiteLogo, text: "Personal Website" },
  scholar: { icon: googleLogo, text: "Google Scholar" },
  linkedin: { icon: linkedinLogo, text: "LinkedIn Profile" },
  phone: { icon: phoneLogo, text: "" },
  scopus: { icon: scopusLogo, text: "Scopus Profile" }
};

const authorRankMapper = {
  assistant: "Assistant Professor",
  associate: "Associate Professor",
  professor: "Full Professor",
  adjunct: "Adjunct Professor",
  visiting: "Visiting Professor",
  emeritus: "Professor Emeritus"
};

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { authorInfo: {}, showContactModal: false };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.fetchAuthorInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.authorID !== prevProps.authorID) {
      this.fetchAuthorInfo();
    }
  }

  async fetchAuthorInfo() {
    try {
      // 1. fetch the data from API
      const response = await axios.get(`/a/${this.props.authorID}`);

      // 2. re-shape the data and add new entities (such as default avatar)
      const authorInfo = {
        avatar:
          response.data.picture || response.data.sex === "m"
            ? avatarMale
            : avatarFemale,
        first: response.data.first,
        last: response.data.last,
        rank:
          authorRankMapper[response.data.rank.toLowerCase()] ||
          response.data.rank,
        department: response.data.departments[0].name,
        institution: response.data.institutions[0].name,
        contact: response.data.contact.filter(
          contact => contact.type !== "Institution ID"
        )
      };

      // 3. processing contacts (adding icons and modifying text and address)
      authorInfo.contact.forEach(contact => {
        const contactType = contact.type.toLowerCase();
        const contactMapperType = Object.keys(contactMapper).find(
          item => contactType.indexOf(item) >= 0
        );

        if (!contact.icon) {
          contact.icon = contactMapper[contactMapperType].icon;
        }
        if (!contact.text) {
          contact.text = contactMapper[contactMapperType].text
            ? contactMapper[contactMapperType].text
            : contact.address;
        }
        if (contactMapperType === "phone") contact.address = null;
        if (contactMapperType === "email") {
          contact.address = `mailto:${contact.address}`;
        }
      });

      // 4. setting the state to display the data
      this.setState({ authorInfo: authorInfo });
    } catch (e) {
      this.setState({ authorInfo: {} });
    }
  }

  toggleModal() {
    this.setState(prevState => ({
      showContactModal: !prevState.showContactModal
    }));
  }

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
                  src={this.state.authorInfo.avatar}
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
            <Button
              type="primary"
              icon="info-circle"
              onClick={this.toggleModal}
            >
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
              onCancel={this.toggleModal}
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
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.address}
                    >
                      <Avatar src={item.icon} style={{marginRight: "8px"}}/>
                      {item.text}
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
