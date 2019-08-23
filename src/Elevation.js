import React, { Component } from "react";
import "./Elevation.scss"

class Elevation extends Component {
  render() {
    return (
      <div
        className={`z-${this.props.depth}`}
        style={this.props.styles}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Elevation;