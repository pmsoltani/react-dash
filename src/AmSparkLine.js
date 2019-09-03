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
  { year: "2019", papers: 16, citations: 386 }
];

class AmSparkLine extends Component {
  componentDidMount() {
    let chart = am4core.create("sparklinediv", am4charts.XYChart);

    chart.data = data;

    // Create axes
    let yearAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    yearAxis.dataFields.category = "year";
    yearAxis.renderer.grid.template.disabled = true;
    yearAxis.renderer.grid.template.location = 0;
    yearAxis.cursorTooltipEnabled = false;
    yearAxis.renderer.disabled = true;
    yearAxis.renderer.line.strokeOpacity = 0;

    let citationsAxis = chart.yAxes.push(new am4charts.ValueAxis());
    citationsAxis.renderer.opposite = true;
    citationsAxis.renderer.grid.template.disabled = true;
    citationsAxis.renderer.minWidth = 50;
    citationsAxis.min = 0;
    citationsAxis.cursorTooltipEnabled = false;
    citationsAxis.renderer.disabled = true;

    let citationsSeries = chart.series.push(new am4charts.LineSeries());
    citationsSeries.dataFields.valueY = "citations";
    citationsSeries.dataFields.categoryX = "year";
    citationsSeries.yAxis = citationsAxis;
    citationsSeries.tooltipText = "{categoryX}: [bold]{valueY}";
    // citationsSeries.tooltip.getFillFromObject = false;
    // citationsSeries.tooltip.background.fill = am4core.color("#46C5F1");
    // citationsSeries.tooltip.label.fill = am4core.color("#000");
    citationsSeries.legendSettings.labelText = "citations";
    citationsSeries.strokeWidth = 3;
    citationsSeries.stroke = am4core.color("#000");
    citationsSeries.tensionX = 0.8;

    citationsSeries.fill = am4core.color("#000");

    let bullet = citationsSeries.bullets.push(new am4charts.Bullet());
    let circle = bullet.createChild(am4core.Circle);
    circle.width = 5;
    circle.height = 5;
    circle.stroke = am4core.color("#000");
    circle.strokeWidth = 3;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "none";
    chart.cursor.lineY = false;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = yearAxis;
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
    return <div id="sparklinediv" style={{ height: "100px", width: "100px" }} />;
  }
}

export default AmSparkLine;
