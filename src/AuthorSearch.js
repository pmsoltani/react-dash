import React, { Component } from "react";
import { AutoComplete } from "antd";

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

  onFocus = () => {
    fetch("/a/list")
      .then(response => response.json())
      .then(list => {
        let authorsList = list.map(opt => (
          <Option key={opt.idFrontend} value={opt.idFrontend}>
            {`${opt.last}, ${opt.first}`}
          </Option>
        ));

        this.setState({
          authorsList: authorsList,
          authorsListFiltered: authorsList
        });
      });
  };

  onSearch = searchText => {
    let authorsListFiltered = this.state.authorsList;
    this.setState({
      authorsListFiltered: authorsListFiltered.filter(
        author =>
          author.props.children
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
        onFocus={this.onFocus}
        allowClear
      />
    );
  }
}

export default AuthorSearch;
