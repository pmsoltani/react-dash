import React, { Component } from "react";
import { Row, Col } from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Elevation from "./Elevation";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import "./AmBarChart.css";


am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

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

class AmBarChart extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.colors.step = 4;
    chart.data = data;

    // Create axes
    let yearAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    yearAxis.dataFields.category = "year";
    yearAxis.renderer.grid.template.disabled = true;
    yearAxis.cursorTooltipEnabled = false;

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
    papersSeries.tooltipText = "papers: {valueY}";
    papersSeries.tooltip.getFillFromObject = false;
    papersSeries.tooltip.background.fill = am4core.color("#EB4886");
    papersSeries.tooltip.label.fill = am4core.color("#000");
    papersSeries.columns.template.strokeWidth = 0;
    papersSeries.legendSettings.labelText = "papers"
    papersSeries.tooltip.pointerOrientation = "vertical";


    papersSeries.columns.template.column.cornerRadiusTopLeft = 10;
    papersSeries.columns.template.column.cornerRadiusTopRight = 10;
    papersSeries.columns.template.column.fillOpacity = 0.8;

    let barGradient = new am4core.LinearGradient();
    barGradient.addColor(am4core.color("#B855A4"));
    barGradient.addColor(am4core.color("#EB4886"));
    barGradient.rotation = 90;
    papersSeries.fill = barGradient;

    let citationsSeries = chart.series.push(new am4charts.LineSeries());
    citationsSeries.dataFields.valueY = "citations";
    citationsSeries.dataFields.categoryX = "year";
    citationsSeries.yAxis = citationsAxis;
    citationsSeries.tooltipText = "citations: {valueY}";
    citationsSeries.tooltip.getFillFromObject = false;
    citationsSeries.tooltip.background.fill = am4core.color("#46C5F1");
    citationsSeries.tooltip.label.fill = am4core.color("#000");
    citationsSeries.legendSettings.labelText = "citations";
    citationsSeries.strokeWidth = 3;
    citationsSeries.tensionX = 0.8;

    let lineGradient = new am4core.LinearGradient();
    lineGradient.addColor(am4core.color("#6592DA"), 1);
    lineGradient.addColor(am4core.color("#46C5F1"), 0);
    // lineGradient.addColor(am4core.color("#46C5F1"), 0);
    lineGradient.rotation = 90;
    citationsSeries.fillOpacity = 0.8;
    citationsSeries.fill = lineGradient;

    let bullet = citationsSeries.bullets.push(new am4charts.Bullet());
    let circle = bullet.createChild(am4core.Circle);
    circle.width = 15;
    circle.height = 15;
    circle.fill = am4core.color("#6592DA");
    circle.strokeWidth = 3;

    // on hover, make corner radiuses bigger
    let hoverState = papersSeries.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    // Legend
    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY = false;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div className="chart-container">
        <Row type="flex" justify="center">
          <Col xs={20} className="chart-col">
            <Elevation
              depth={1}
              styles={{
                borderRadius: "10px",
                padding: "24px",
                backgroundColor: "#fff"
              }}
            >
              <div id="chartdiv" style={{ width: "100%", height: "500px" }} />
            </Elevation>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AmBarChart;
