// libraries
import React, { Component } from "react";
import { AutoComplete } from "antd";
import axios from "axios";

// env variables
import apiUrl from "./env";

const { Option } = AutoComplete;

class AuthorSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorsList: [],
      authorsListFiltered: []
    };

    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    this.fetchAuthors();
  }

  async fetchAuthors() {
    let initMessage = ["fetching faculties"];
    let errorMessage = ["failed :("];
    try {
      this.setState({ authorsListFiltered: initMessage });

      const response = await axios.get(`${apiUrl}/a/list`);
      const authorsList = response.data.map(opt => (
        <Option
          key={opt.idFrontend}
          value={opt.idFrontend}
          text={`${opt.last}, ${opt.first}`}
        >
          <span style={{ fontWeight: 700 }}>{opt.last}</span>
          <span>, </span>
          <span>{opt.first}</span>
        </Option>
      ));

      this.setState({
        authorsList: authorsList,
        authorsListFiltered: authorsList
      });
    } catch (e) {
      this.setState({ authorsList: [], authorsListFiltered: errorMessage });
    }
  }

  onSearch = searchText => {
    let authorsListFiltered = this.state.authorsList;
    this.setState({
      authorsListFiltered: authorsListFiltered.filter(
        author =>
          author.props.text
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) >= 0
      )
    });
  };

  onSelect(value) {
    this.props.onSelect(value);
  }

  render() {
    return (
      <AutoComplete
        dataSource={this.state.authorsListFiltered}
        style={this.props.style}
        onSelect={this.onSelect}
        onSearch={this.onSearch}
        placeholder="faculty search"
        optionLabelProp="text"
        allowClear
      />
    );
  }
}

export default AuthorSearch;
