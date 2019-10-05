import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

am4core.useTheme(am4themes_animated);

const maxWordCount = 40; // max number of words that chart displays

// Data format
// [{ word: "keyword1", value: 3 },...]

class AmWordCloud extends Component {
  componentDidMount() {
    if (this.props.authorID) {
      this.fetchWordCloud();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.authorID !== prevProps.authorID) {
      this.fetchWordCloud();
    }
  }

  async fetchWordCloud() {
    try {
      const response = await axios.get(`/a/${this.props.authorID}/keywords`);
      if (response.data.length > maxWordCount) {
        response.data
          .sort((key1, key2) => (key1.value < key2.value ? 1 : -1))
          .splice(maxWordCount);
      }
      this.chart = this.makeWordCloud(response.data);
    } catch (e) {
      this.chart = this.makeWordCloud([]);
    }
  }

  makeWordCloud(data) {
    let chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);

    chart.paddingLeft = 0;
    chart.paddingRight = 0;

    let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    series.data = data;

    series.dataFields.word = "keyword";
    series.dataFields.value = "value";
    series.angles = [0, 0, 0, 90];

    series.colors = new am4core.ColorSet();
    series.colors.step = 4;
    series.colors.passOptions = {};
    series.labels.template.tooltipText = "{word}: [bold]{value}[/]";

    let hoverState = series.labels.template.states.create("hover");
    hoverState.properties.fill = am4core.color("#000000");

    series.labels.template.events.on(
      "hit",
      e => this.handleHit(e.target.dataItem.dataContext.keyword),
      this
    );

    return chart;
  }

  handleHit(data) {
    this.props.callback({ keyword: data });
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="chartdiv" style={this.props.style} />;
  }
}

export default AmWordCloud;
