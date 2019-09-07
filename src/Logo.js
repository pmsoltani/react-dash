import React, { Component } from "react";
import "./Logo.css";

class Logo extends Component {
  render() {
    return (
      <div
        className="logo-container"
        style={{ fontFamily: "Pacifico", ...this.props.style }}
      >
        elsametric
      </div>
    );
  }
}

export default Logo;
