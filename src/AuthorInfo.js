// libraries
import React, { Component } from "react";
import { Typography, List, Avatar, Modal, Button, Icon, Popover } from "antd";
import { Container, Row, Col } from "react-grid-system";
import axios from "axios";

// other assets
import "./AuthorInfo.css";
import linkedinLogo from "./assets/linkedin.svg";
import emailLogo from "./assets/email.svg";
import phoneLogo from "./assets/phone.svg";
import googleLogo from "./assets/google.svg";
import websiteLogo from "./assets/website.svg";
import scopusLogo from "./assets/scopus.svg";
import avatarMale from "./assets/profile-male.svg";
import avatarFemale from "./assets/profile-female.svg";

// env variables
import { apiUrl } from "./env";

const { Title, Text } = Typography;

// used to add icons and appropriate texts to each contact
const contactMapper = {
  email: { icon: emailLogo, text: "", showLink: true },
  website: { icon: websiteLogo, text: "Personal Website", showLink: true },
  scholar: { icon: googleLogo, text: "Google Scholar", showLink: true },
  linkedin: { icon: linkedinLogo, text: "LinkedIn Profile", showLink: true },
  phone: { icon: phoneLogo, text: "", showLink: false },
  scopus: { icon: scopusLogo, text: "Scopus Profile", showLink: true }
};

const authorRankMapper = {
  assistant: "Assistant Professor",
  associate: "Associate Professor",
  professor: "Full Professor",
  adjunct: "Adjunct Professor",
  visiting: "Visiting Professor",
  emeritus: "Professor Emeritus"
};

const departmentTypesOrder = [
  "Department",
  "Faculty",
  "Research Center",
  "Center of Excellence",
  "Education Center"
];

const mapOrder = (array, order, key) => {
  array.sort((a, b) => {
    const A = a[key];
    const B = b[key];
    return order.indexOf(A) > order.indexOf(B) ? 1 : -1;
  });
  return array;
};

class AuthorInfo extends Component {
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
      const response = await axios.get(`${apiUrl}/a/${this.props.authorID}`);

      // 2. re-shape the data and add new entities (such as default avatar)
      let authorRank, authorDepartment, authorInstitution;
      try {
        if (Object.values(authorRankMapper).includes(response.data.rank)) {
          authorRank = response.data.rank;
        } else {
          authorRank = authorRankMapper[response.data.rank.toLowerCase()];
        }
      } catch {}

      try {
        response.data.departments = mapOrder(
          response.data.departments,
          departmentTypesOrder,
          "type"
        );
        authorDepartment = response.data.departments[0].name;
      } catch {}

      try {
        authorInstitution = response.data.institutions[0].name;
      } catch {}

      const authorInfo = {
        avatar:
          response.data.picture ||
          (response.data.sex === "f" ? avatarFemale : avatarMale),
        first: response.data.first,
        last: response.data.last,
        rank: authorRank,
        department: authorDepartment,
        institution: authorInstitution,
        contact: response.data.contact
      };

      // 3. processing contacts (adding icons and modifying text and address)
      authorInfo.contact.forEach(contact => {
        const contactType = contact.type.toLowerCase();
        contact.shortType = Object.keys(contactMapper).find(
          item => contactType.indexOf(item) >= 0
        );

        contact.showLink = contactMapper[contact.shortType].showLink;
        if (!contact.icon) {
          contact.icon = contactMapper[contact.shortType].icon;
        }
        if (!contact.text) {
          contact.text = contactMapper[contact.shortType].text
            ? contactMapper[contact.shortType].text
            : contact.address;
        }
        if (contact.shortType === "email") {
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

  contactRender(contact) {
    const contactItem = (
      <>
        <Avatar src={contact.icon} style={{ marginRight: "8px" }} />
        {contact.text}
      </>
    );

    if (contact.showLink)
      return (
        <a target="_blank" rel="noopener noreferrer" href={contact.address}>
          {contactItem}
        </a>
      );

    return contactItem;
  }

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
                renderItem={contact => (
                  <List.Item
                    style={{
                      borderBottom: 0,
                      padding: 0,
                      paddingBottom: "6px"
                    }}
                  >
                    {this.contactRender(contact)}
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

export default AuthorInfo;
