import React, { Component } from "react";
import { Layout } from "antd";
import "./App.css";
import { ScreenClassProvider } from "react-grid-system";

import PageFooter from "./PageFooter";
import PageHeader from "./PageHeader";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      landingPage: true,
      authorID: ""
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  handleSearch(authorID) {
    this.setState({
      landingPage: false,
      authorID: authorID
    });
  }

  handleLogoClick() {
    this.setState({
      landingPage: true
    });
  }

  render() {
    if (this.state.landingPage) {
      return (
        <LandingPage
          onSelect={this.handleSearch}
          onClick={this.handleLogoClick}
        />
      );
    }
    return (
      <ScreenClassProvider id="page-container">
        <PageHeader
          onSelect={this.handleSearch}
          onClick={this.handleLogoClick}
        />

        <Content id="page-content">
          <Dashboard authorID={this.state.authorID} />
        </Content>

        <Layout>
          <PageFooter onClick={this.handleLogoClick} />
        </Layout>
      </ScreenClassProvider>
    );
  }
}

export default App;
