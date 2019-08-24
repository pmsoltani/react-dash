import React, { Component } from "react";
import { Layout } from "antd";
import "./App.css";

import PageFooter from "./PageFooter";
// import Navbar from "./Navbar";
import PageHeader from "./PageHeader";
import Dashboard from "./Dashboard";

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <div id="page-container">
        <PageHeader />

        <Content id="page-content">
          <Dashboard />
        </Content>

        <Layout>
          <PageFooter />
        </Layout>
      </div>
    );
  }
}

export default App;
