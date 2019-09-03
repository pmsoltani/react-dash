import React, { Component } from "react";
import { Row, Col } from "antd";
import Elevation from "./Elevation";
import AmMixedChart from "./AmMixedChart";
import Papers from "./Papers";
// import "./ChartTable.css";

// const { Text } = Typography;

class ChartTable extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  };

  chartData(params) {
    this.setState({
      data : params
    })
  }

  render() {
    return (
      <div className="chart-table-container">
        <Row type="flex" justify="center">
          <Col xs={24} className="chart-col">
            <Elevation
              depth={1}
              styles={{
                borderRadius: "10px",
                padding: "24px",
                backgroundColor: "#fff"
              }}
            >
              {/* <AmMixedChart callback={this.chartData.bind(this)} /> */}
              <Papers data={this.state.data} />
              {/* <div id="charttable" style={{ border: "1px solid black" }}>
                papers:<Text code></Text>
                <br />
                citations:<Text code></Text>
              </div> */}
            </Elevation>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChartTable;
