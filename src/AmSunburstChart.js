import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_sunburst from "@amcharts/amcharts4/plugins/sunburst";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

am4core.useTheme(am4themes_animated);

// Data format
// [{ name: "q1", percentiles: [{ name: "p1", value: 12}, ...]}, ...]

class AmSunburstChart extends Component {
  componentDidMount() {
    if (this.props.authorID) {
      this.fetchSunburstChart();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.authorID !== prevProps.authorID) {
      this.fetchSunburstChart();
    }
  }

  async fetchSunburstChart() {
    try {
      const response = await axios.get(`/a/${this.props.authorID}/qs`);
      this.chart = this.makeSunburstChart(response.data);
    } catch (e) {
      this.chart = this.makeSunburstChart([]);
    }
  }

  makeSunburstChart(data) {
    let chart = am4core.create("Sunburstchart", am4plugins_sunburst.Sunburst);

    chart.data = data;

    chart.colors.step = 4;
    chart.fontSize = 12;
    chart.innerRadius = am4core.percent(20);

    // Add and configure Series
    chart.dataFields.value = "value";
    chart.dataFields.name = "name";
    chart.dataFields.children = "percentiles";

    let level0 = new am4plugins_sunburst.SunburstSeries();
    level0.hiddenInLegend = false;
    chart.seriesTemplates.setKey("0", level0);

    // this makes labels to be hidden if they don't fit
    level0.labels.template.truncate = true;
    level0.labels.template.hideOversized = true;
    level0.labels.template.text = "[text-transform:capitalize]{category}";
    level0.slices.template.tooltipText =
      "[text-transform:capitalize]{category}: " +
      "{value.percent.formatNumber('#.#')}% ({value.value})";

    level0.labels.template.adapter.add("rotation", (rotation, target) => {
      target.maxWidth =
        target.dataItem.slice.radius - target.dataItem.slice.innerRadius - 10;
      target.maxHeight = Math.abs(
        ((target.dataItem.slice.arc *
          (target.dataItem.slice.innerRadius + target.dataItem.slice.radius)) /
          2) *
          am4core.math.RADIANS
      );

      return rotation;
    });

    let level1 = level0.clone();
    chart.seriesTemplates.setKey("1", level1);
    level1.fillOpacity = 0.75;
    level1.hiddenInLegend = true;
    level1.labels.template.text = "[text-transform:capitalize]{category}";

    chart.legend = new am4charts.Legend();
    chart.legend.position = "left";
    chart.legend.width = 60;
    chart.legend.labels.template.text = "[text-transform:capitalize]{category}";
    chart.legend.valueLabels.template.text = null;

    level0.slices.template.events.on(
      "hit",
      e => this.handleHit(e.target.dataItem.dataContext.name),
      this
    );

    level1.slices.template.events.on(
      "hit",
      e => this.handleHit(e.target.dataItem.dataContext.name),
      this
    );

    return chart;
  }

  handleHit(data) {
    this.props.callback({ rank: data });
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="Sunburstchart" style={this.props.style} />;
  }
}

export default AmSunburstChart;
