import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const data = [
  { year: "2011", papers: 190, citations: 99 },
  { year: "2012", papers: 61, citations: 148 },
  { year: "2013", papers: 31, citations: 368 },
  { year: "2014", papers: 106, citations: 261 },
  { year: "2015", papers: 109, citations: 116 },
  { year: "2016", papers: 16, citations: 27 },
  { year: "2017", papers: 16, citations: 66 },
  { year: "2018", papers: 16, citations: 315 },
  { year: "2019", papers: 16, citations: 380 }
];

class AmSparkLine extends Component {
  componentDidMount() {
    let chart = am4core.create("sparklinediv", am4charts.XYChart);

    chart.padding(0, 0, 0, 0);

    chart.data = data;

    // Create axes
    let hAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    hAxis.dataFields.category = "year";
    hAxis.renderer.grid.template.disabled = true;
    hAxis.renderer.labels.template.disabled = true;
    hAxis.cursorTooltipEnabled = false;

    let vAxis = chart.yAxes.push(new am4charts.ValueAxis());
    vAxis.renderer.grid.template.disabled = true;
    vAxis.renderer.baseGrid.disabled = true;
    vAxis.renderer.labels.template.disabled = true;
    vAxis.cursorTooltipEnabled = false;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "citations";
    series.dataFields.categoryX = "year";
    series.tooltipText = "{categoryX}:\n[bold]{valueY}";
    series.tensionX = 0.8;

    let bullet = series.bullets.push(new am4charts.Bullet());
    let circle = bullet.createChild(am4core.Circle);
    circle.width = 5;
    circle.height = 5;
    circle.strokeWidth = 3;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "none";
    chart.cursor.lineY = false;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = hAxis;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#000");
    chart.cursor.lineX.fillOpacity = 0.1;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="sparklinediv" style={this.props.style} />;
  }
}

export default AmSparkLine;
