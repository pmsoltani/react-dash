import React, { Component } from "react";
import { Layout } from "antd";
import "./App.css";

import PageFooter from "./PageFooter";
// import Navbar from "./Navbar";
import PageHeader from "./PageHeader";
import Dashboard from "./Dashboard";

const { Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div id="page-container">
        <PageHeader />

        <Content id="page-content">
          <Dashboard />
        </Content>

        <Layout>
          <Footer id="page-footer">
            <PageFooter />
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
