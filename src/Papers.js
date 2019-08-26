import React, { Component } from "react";
import { Table } from "antd";
// import "./Papers.css";

const columns = [
  {
    title: "Papers",
    dataIndex: "papers",
    key: "papers"
  },
  {
    title: "Citations",
    dataIndex: "citations",
    key: "citations"
  }
];

class Papers extends Component {
  constructor() {
    super();
    this.state = {
      data: { key: "1", papers: null, citations: null }
    };
  }

  componentWillReceiveProps(nextProps) {
    // Any time props.data changes, update state.
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data
      });
    }
  }

  getData = () => [
    {
      key: "1",
      papers: this.state.data.papers,
      citations: this.state.data.citations
    }
  ];

  render() {
    return (
      <div>
        <Table dataSource={this.getData()} columns={columns} />;
      </div>
    );
  }
}

export default Papers;
