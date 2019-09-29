import React, { Component } from "react";
import { Table, Card, Tag, Icon } from "antd";

const columns = [
  { title: "#", dataIndex: "key" },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => (a.title > b.title ? 1 : -1)
  },
  {
    title: "Year",
    dataIndex: "date",
    render: y => (
      <Tag color="#108ee9" key={y}>
        {y}
      </Tag>
    )
  },
  {
    title: "DOI",
    dataIndex: "doi",
    render: doi =>
      doi ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://doi.org/${doi}`}
        >
          <Icon type="logout" rotate={-45} />
        </a>
      ) : (
        doi
      )
  },
  { title: "# Cited", dataIndex: "cited_cnt" },
  {
    title: "Source",
    dataIndex: "source",
    sorter: (a, b) => (a.source > b.source ? 1 : -1)
  },
  {
    title: "Tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags
          .filter(tag => tag.value)
          .map(tag => {
            let color = tag.length > 5 ? "geekblue" : "geekblue";
            if (tag.key === "quartile") {
              if (tag.value === "q1") {
                color = "green";
              } else if (tag.value === "q2") {
                color = "gold";
              } else if (tag.value === "q3") {
                color = "volcano";
              } else if (tag.value === "q4") {
                color = "red";
              } else if (tag.value === "null") {
                color = "red";
              }
            } else if (tag.key === "open_access") {
              if (tag.value === "close access") {
                color = "magenta";
              }
            }

            return (
              <Tag color={color} key={tag.key}>
                {tag.value ? tag.value.toUpperCase() : null}
              </Tag>
            );
          })}
      </span>
    )
  }
];

class Papers extends Component {
  constructor(props) {
    super(props);

    this.state = { currentPage: 1 };

    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.papers === prevProps.papers) {
      return;
    }

    this.setState({ currentPage: 1 });
  }

  onChange(pagination) {
    this.setState({ currentPage: pagination.current });
  }

  render() {
    return (
      <Card hoverable>
        <Table
          dataSource={this.props.papers}
          columns={columns}
          pagination={{ current: this.state.currentPage }}
          onChange={this.onChange}
        />
      </Card>
    );
  }
}

export default Papers;
