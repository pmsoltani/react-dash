import React, { Component } from "react";
import PropTypes from "prop-types";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
// import "./AmPieChart.css";

import am4themes_myTheme from "./assets/am4themes_myTheme";


am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_myTheme);

const data = [
  {
    country: "Q1",
    litres: 501.9,
    pulled: true
  },
  {
    country: "Q2",
    litres: 301.9
  },
  {
    country: "Q3",
    litres: 201.1
  },
  {
    country: "Q4",
    litres: 165.8
  }
];

class AmPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = { papers: null, citations: null };
  }

  handleHit(data) {
    this.props.callback(data);
  }

  componentDidMount() {
    let chart = am4core.create("piechart", am4charts.PieChart);

    chart.data = data;

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";

    // Visual configs
    chart.colors.step = 4;
    chart.innerRadius = am4core.percent(40);
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

    this.chart = chart;
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

AmPieChart.protoTypes = {
  callback: PropTypes.func
};

export default AmPieChart;
