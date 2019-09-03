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

class AmSparkBar extends Component {
  componentDidMount() {
    let chart = am4core.create("sparkbardiv", am4charts.XYChart);

    // chart.colors.step = 4;
    chart.data = data;

    // Create axes
    let yearAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    yearAxis.dataFields.category = "year";
    yearAxis.renderer.grid.template.disabled = true;
    yearAxis.renderer.grid.template.location = 0;
    yearAxis.cursorTooltipEnabled = false;
    yearAxis.renderer.disabled = true;

    let papersAxis = chart.yAxes.push(new am4charts.ValueAxis());
    papersAxis.renderer.minWidth = 50;
    papersAxis.min = 0;
    papersAxis.cursorTooltipEnabled = false;
    papersAxis.renderer.grid.template.disabled = true;
    papersAxis.renderer.disabled = true;

    // Create series
    let papersSeries = chart.series.push(new am4charts.ColumnSeries());
    papersSeries.dataFields.valueY = "papers";
    papersSeries.dataFields.categoryX = "year";
    papersSeries.yAxis = papersAxis;
    papersSeries.tooltipText = "{categoryX}: [bold]{valueY}";
    papersSeries.columns.template.strokeWidth = 0;
    papersSeries.fill = am4core.color("#000")

    papersSeries.sequencedInterpolation = true;
    papersSeries.columns.template.events.on(
      "hit",
      e => {
        const data = e.target.dataItem.dataContext;
        this.handleHit(data);
      },
      this
    );

    // on hover, make corner radiuses bigger
    let hoverState = papersSeries.columns.template.column.states.create(
      "hover"
    );
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

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
    return <div id="sparkbardiv" style={{ height: "100px", width: "100px" }} />;
  }
}

export default AmSparkBar;
