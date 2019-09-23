import React, { Component } from "react";
import { Layout } from "antd";
import "./App.css";
import { ScreenClassProvider } from "react-grid-system";

import PageFooter from "./PageFooter";
// import Navbar from "./Navbar";
import PageHeader from "./PageHeader";
import Dashboard from "./Dashboard";

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorID: ""
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(authorID) {
    this.setState({
      authorID: authorID
    });
  }

  render() {
    return (
      <ScreenClassProvider id="page-container">
        <PageHeader onSelect={this.handleSearch} />

        <Content id="page-content">
          <Dashboard authorID={this.state.authorID} />
        </Content>

        <Layout>
          <PageFooter />
        </Layout>
      </ScreenClassProvider>
    );
  }
}

export default App;
