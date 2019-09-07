import React, { Component } from "react";
import PropTypes from "prop-types";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4themes_material from "@amcharts/amcharts4/themes/material";

am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_material);

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

class AmMixedChart extends Component {
  constructor(props) {
    super(props);
    this.state = { papers: null, citations: null };
  }

  handleHit(data) {
    this.props.callback(data);
  }

  componentDidMount() {
    let chart = am4core.create("mixedchart", am4charts.XYChart);

    chart.paddingLeft = 0
    chart.paddingRight = 0

    chart.data = data;

    // Create Colors
    let colorSet = new am4core.ColorSet();
    colorSet.step = 2;
    let barColor1 = colorSet.next();
    let barColor2 = colorSet.next();
    let lineColor1 = colorSet.next();
    let lineColor2 = colorSet.next();

    // Create axes
    let yearAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    yearAxis.dataFields.category = "year";
    yearAxis.renderer.grid.template.disabled = true;
    yearAxis.renderer.grid.template.location = 0;

    let papersAxis = chart.yAxes.push(new am4charts.ValueAxis());
    papersAxis.renderer.minWidth = 50;
    papersAxis.min = 0;
    papersAxis.cursorTooltipEnabled = false;

    let citationsAxis = chart.yAxes.push(new am4charts.ValueAxis());
    citationsAxis.renderer.opposite = true;
    citationsAxis.renderer.grid.template.disabled = true;
    citationsAxis.renderer.minWidth = 50;
    citationsAxis.min = 0;
    citationsAxis.cursorTooltipEnabled = false;

    // Create series
    let papersSeries = chart.series.push(new am4charts.ColumnSeries());
    papersSeries.dataFields.valueY = "papers";
    papersSeries.dataFields.categoryX = "year";
    papersSeries.yAxis = papersAxis;
    papersSeries.tooltipText = "papers: [bold]{valueY}";
    papersSeries.tooltip.getFillFromObject = false;
    papersSeries.tooltip.background.fill = am4core.color(barColor2);
    papersSeries.tooltip.label.fill = am4core.color("#000");
    papersSeries.tooltip.pointerOrientation = "vertical";
    papersSeries.columns.template.strokeWidth = 0;
    papersSeries.legendSettings.labelText = "papers";
    papersSeries.columns.template.column.cornerRadiusTopLeft = 10;
    papersSeries.columns.template.column.cornerRadiusTopRight = 10;
    papersSeries.columns.template.column.fillOpacity = 0.8;

    let barGradient = new am4core.LinearGradient();
    barGradient.addColor(barColor2);
    barGradient.addColor(barColor1);
    barGradient.rotation = 90;
    papersSeries.fill = barGradient;

    papersSeries.sequencedInterpolation = true;
    papersSeries.columns.template.events.on(
      "hit",
      e => {
        const data = e.target.dataItem.dataContext;
        this.handleHit(data);
      },
      this
    );

    let citationsSeries = chart.series.push(new am4charts.LineSeries());
    citationsSeries.dataFields.valueY = "citations";
    citationsSeries.dataFields.categoryX = "year";
    citationsSeries.yAxis = citationsAxis;
    citationsSeries.tooltipText = "citations: [bold]{valueY}";
    citationsSeries.tooltip.getFillFromObject = false;
    citationsSeries.tooltip.background.fill = am4core.color(lineColor1);
    citationsSeries.tooltip.label.fill = am4core.color("#000");
    citationsSeries.legendSettings.labelText = "citations";
    citationsSeries.stroke = lineColor2;
    citationsSeries.strokeWidth = 3;
    citationsSeries.tensionX = 0.8;

    let lineGradient = new am4core.LinearGradient();
    lineGradient.addColor(lineColor2, 1);
    lineGradient.addColor(lineColor1, 0.1);
    lineGradient.rotation = 90;
    citationsSeries.fillOpacity = 0.8;
    citationsSeries.fill = lineGradient;

    let bullet = citationsSeries.bullets.push(new am4charts.Bullet());
    let circle = bullet.createChild(am4core.Circle);
    circle.width = 15;
    circle.height = 15;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    // on hover, make corner radiuses bigger
    let hoverState = papersSeries.columns.template.column.states.create(
      "hover"
    );
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    // Legend
    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;

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
    return <div id="mixedchart" style={this.props.style} />;
  }
}

AmMixedChart.protoTypes = {
  callback: PropTypes.func
};

export default AmMixedChart;
