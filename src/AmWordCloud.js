import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

am4core.useTheme(am4themes_animated);

// Data format
// [{ word: "keyword1", value: 3 },...]

class AmWordCloud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

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
      const chartData = Object.keys(response.data).map(key => {
        return {
          word: key,
          value: response.data[key]
        };
      });

      this.setState({ data: chartData }, () =>
        this.makeWordCloud(this.state.data)
      );
    } catch (e) {
      console.log(e);
      this.setState({ data: [] });
    }
  }

  makeWordCloud(data) {
    let chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);

    chart.paddingLeft = 0;
    chart.paddingRight = 0;

    let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    series.data = data;

    series.dataFields.word = "word";
    series.dataFields.value = "value";
    series.angles = [0, 0, 0, 90];

    series.colors = new am4core.ColorSet();
    series.colors.step = 4;
    series.colors.passOptions = {};
    series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";

    let hoverState = series.labels.template.states.create("hover");
    hoverState.properties.fill = am4core.color("#000000");

    series.labels.template.events.on(
      "hit",
      e => {
        const data = {
          tag: e.target.dataItem.dataContext.word,
          value: e.target.dataItem.dataContext.value
        };
        this.handleHit(data);
      },
      this
    );

    return chart;
  }

  handleHit(data) {
    this.props.callback({tag: data.tag});
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
