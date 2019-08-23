import React, { Component } from "react";
import logo from "./assets/wieldyLogo.png";

class Logo extends Component {
  render() {
    return (
      <div
        className="logo-container"
        style={{ width: this.props.width, height: this.props.height }}
      >
        <img src={logo} alt="app logo" width="100%" height="100%" />
        {/* <div>elsametric</div> */}
      </div>
    );
  }
}

export default Logo;
