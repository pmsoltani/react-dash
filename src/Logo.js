import React, { Component } from "react";
import "./Logo.css";

class Logo extends Component {
  constructor(props) {
    super(props);

    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  handleLogoClick(e) {
    this.props.onClick(e);
  }

  render() {
    return (
      <div
        className="logo-container"
        style={{ fontFamily: "Pacifico", ...this.props.style }}
        onClick={this.handleLogoClick}
      >
        elsametric
      </div>
    );
  }
}

export default Logo;
