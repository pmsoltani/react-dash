import React, { Component } from "react";
import { Table, Card } from "antd";
// import "./Papers.css";

const columns = [
  { title: "#", dataIndex: "key" },
  { title: "Title", dataIndex: "title" },
  { title: "Type", dataIndex: "type" },
  { title: "Date", dataIndex: "date" },
  { title: "DOI", dataIndex: "doi" },
  { title: "Open Access", dataIndex: "open_access" },
  { title: "# Cited", dataIndex: "cited_cnt" },
  { title: "Source", dataIndex: "source" },
  { title: "Q", dataIndex: "quartile" }
];

class Papers extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     data: { key: "1", papers: null, citations: null }
  //   };
  // }

  // componentDidUpdate(prevProps) {
  //   // Any time props.data changes, update state.
  //   if (this.props.data !== prevProps.data) {
  //     this.setState({
  //       data: this.props.data
  //     });
  //   }
  // }

  // getData = () => [
  //   {
  //     key: "1",
  //     papers: this.state.data.papers,
  //     citations: this.state.data.citations
  //   }
  // ];

  render() {
    return (
      <Card hoverable>
        <Table dataSource={this.props.papers} columns={columns} />
      </Card>
    );
  }
}

export default Papers;
