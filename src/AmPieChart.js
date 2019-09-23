import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

am4core.useTheme(am4themes_animated);

// Data format
// [{ rank: "Q1", value: 501.9, pulled: true },...]

class AmPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    if (this.props.authorID) {
      this.fetchPieChart();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.authorID !== prevProps.authorID) {
      this.fetchPieChart();
    }
  }

  async fetchPieChart() {
    try {
      const response = await axios.get(`/a/${this.props.authorID}/journals`);
      const chartData = Object.keys(response.data)
        .filter(key => response.data[key])
        .map(key => {
          return {
            rank: key.toUpperCase(),
            value: response.data[key],
            pulled: key === "q1" ? true : false
          };
        });

      this.setState({ data: chartData }, () =>
        this.makePieChart(this.state.data)
      );
    } catch (e) {
      console.log(e);
      this.setState({ data: [] });
    }
  }

  makePieChart(data) {
    let chart = am4core.create("piechart", am4charts.PieChart);

    chart.data = data;

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.category = "rank";
    pieSeries.dataFields.value = "value";

    // Visual configs
    chart.innerRadius = am4core.percent(40);
    pieSeries.colors.step = 4;
    pieSeries.slices.template.cornerRadius = 4;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.slices.template.propertyFields.isActive = "pulled";

    // only 1 pulled slice
    pieSeries.slices.template.events.on("hit", e => {
      let series = e.target.dataItem.component;
      series.slices.each(item => {
        if (item.isActive && item !== e.target) {
          item.isActive = false;
        }
      });
    });

    return chart;
  }

  handleHit(data) {
    this.props.callback(data);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="piechart" style={this.props.style} />;
  }
}

export default AmPieChart;
