// libraries
import React, { Component } from "react";
import { Table, Card, Tag, Icon } from "antd";

const tagColors = {
  q1: "green",
  q2: "gold",
  q3: "volcano",
  q4: "red",
  "close access": "magenta",
  year: "#108ee9",
  default: "geekblue"
};
const tableColumns = [
  { title: "#", dataIndex: "key" }, // the index column
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => (a.title > b.title ? 1 : -1)
  },
  {
    // wrap the year in a nice-looking 'Tag'
    title: "Year",
    dataIndex: "date",
    render: y => (
      <Tag color={tagColors.year} key={y}>
        {y}
      </Tag>
    )
  },
  {
    // make the doi into an external link to the paper
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
  {
    title: "# Cited",
    dataIndex: "cited_cnt"
    // render: cited => <Popover content="content">{cited}</Popover>
  },
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
          .filter(tag => tag.value) // only show tags with a value
          .map(tag => {
            return (
              <Tag
                color={tagColors[tag.value] || tagColors.default}
                key={tag.key}
              >
                {tag.value.toUpperCase()}
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

    this.state = { currentPage: 1, expandedRows: [] };

    this.tableRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.papers === prevProps.papers &&
      this.state.currentPage === prevState.currentPage
    ) {
      return;
    } else if (this.props.papers !== prevProps.papers) {
      this.setState({ currentPage: 1, expandedRows: [] });
    }
    this.handleScroll();
  }

  handleChange(pagination) {
    this.setState({ currentPage: pagination.current, expandedRows: [] });
  }

  handleRowExpand(record) {
    this.setState(prevState =>
      prevState.expandedRows.includes(record.key)
        ? {
            expandedRows: prevState.expandedRows.filter(
              key => key !== record.key
            )
          }
        : { expandedRows: [...prevState.expandedRows, record.key] }
    );
  }

  handleScroll() {
    this.tableRef.current.scrollIntoView({ behavior: "smooth" });
  }

  authorsRender(paper) {
    try {
      const authorsList = [];
      paper.authors.forEach(author =>
        authorsList.push(
          <span
            style={author.bold && { fontWeight: 700 }}
            key={author.idFrontend}
          >
            {`${author.first} ${author.last}`}
          </span>
        )
      );
      return (
        <div>{authorsList.reduce((prev, curr) => [prev, ", ", curr])}</div>
      );
    } catch (e) {
      return "Authors not available";
    }
  }

  render() {
    return (
      <div ref={this.tableRef}>
        <Card hoverable>
          <Table
            dataSource={this.props.papers}
            expandedRowRender={paper => this.authorsRender(paper)}
            columns={tableColumns}
            pagination={{ current: this.state.currentPage }}
            loading={this.props.loading}
            onChange={this.handleChange}
            onExpand={(expanded, record) => this.handleRowExpand(record)}
            expandedRowKeys={this.state.expandedRows}
          />
        </Card>
      </div>
    );
  }
}

export default Papers;
