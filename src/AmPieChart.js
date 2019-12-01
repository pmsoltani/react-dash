// libraries
import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

// env variables
import apiUrl from "./env";

// animating the chart
am4core.useTheme(am4themes_animated);

// Data format
// [{ rank: "Q1", value: 501.9, pulled: true },...]

class AmPieChart extends Component {
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
      const response = await axios.get(
        `${apiUrl}/a/${this.props.authorID}/jmetrics`
      );
      const undefinedCategory = response.data[response.data.length - 1];
      let chartData = response.data
        .filter(q => q.name !== "undefined")
        .map(q => ({
          rank: q.name,
          value: q.percentiles.reduce((sum, current) => sum + current.value, 0)
        }))
        .filter(q => q.value);

      chartData[0].pulled = true;
      if (undefinedCategory.value) {
        chartData = [
          ...chartData,
          {
            rank: undefinedCategory.name,
            value: undefinedCategory.value
          }
        ];
      }

      this.chart = this.makePieChart(chartData);
    } catch (e) {
      this.chart = this.makePieChart([]);
    }
  }

  makePieChart(data) {
    let chart = am4core.create("piechart", am4charts.PieChart);

    chart.data = data;

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.category = "rank";
    pieSeries.dataFields.value = "value";

    pieSeries.labels.template.text = "[text-transform:capitalize]{category}";
    pieSeries.slices.template.tooltipText =
      "[text-transform:capitalize]{category}: " +
      "{value.percent.formatNumber('#.#')}% ({value.value})";

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

    pieSeries.slices.template.events.on(
      "hit",
      e => {
        this.handleHit(e.target.dataItem.dataContext.rank);
      },
      this
    );

    return chart;
  }

  handleHit(data) {
    if (data !== "undefined") {
      this.props.callback({ metric: data });
    }
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
