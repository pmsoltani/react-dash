// libraries
import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

// animating the chart
am4core.useTheme(am4themes_animated);

// Data format
// [{ from: "author1", to: "author2", value: 5 }, ...]

class AmChordChart extends Component {
  componentDidMount() {
    if (this.props.authorID) {
      this.fetchChordChart();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.authorID !== prevProps.authorID) {
      this.fetchChordChart();
    }
  }

  async fetchChordChart() {
    try {
      // 1. fetch the chart data from API
      const response = await axios.get(`/a/${this.props.authorID}/network`);

      // 2. re-shaping the retrieved data
      const chartData = response.data.map(item => {
        return {
          from: item.from.name, // name to be shown by the chart
          fromID: item.from.idFrontend, // id to be sent to the parent component
          to: item.to.name, // name to be shown by the chart
          toID: item.to.idFrontend, // id to be sent to the parent component
          value: item.value // number of joint papers between author and coAuthor
        };
      });

      this.chart = this.makeChordChart(chartData);
    } catch (e) {
      this.chart = this.makeChordChart([]);
    }
  }

  makeChordChart(data) {
    let chart = am4core.create("chordchart", am4charts.ChordDiagram);
    console.log("ID", chart.id);
    chart.data = data;

    chart.paddingLeft = 0;
    chart.paddingRight = 0;

    chart.colors.step = 4;

    chart.dataFields.fromName = "from";
    chart.dataFields.toName = "to";
    chart.dataFields.value = "value";
    // chart.dataFields.color = "color";

    chart.nodePadding = 0.5;
    chart.minNodeSize = 0.01;
    chart.startAngle = 80;
    chart.endAngle = chart.startAngle + 360;
    chart.sortBy = "value";
    chart.fontSize = 10;

    let nodeTemplate = chart.nodes.template;
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.propertyFields.fill = "color";
    nodeTemplate.draggable = false;

    let slice = chart.nodes.template.slice;
    slice.stroke = am4core.color("#000");
    slice.strokeOpacity = 0.5;
    slice.strokeWidth = 1;
    slice.cornerRadius = 8;
    slice.innerCornerRadius = 0;

    // when rolled over the node, make all the links rolled-over
    const rolledOver = event => {
      const trueFalse = event.type === "over" ? true : false;
      let node = event.target;
      node.outgoingDataItems.each(dataItem => {
        if (dataItem.toNode) {
          dataItem.link.isHover = trueFalse;
          dataItem.toNode.label.isHover = trueFalse;
        }
      });
      node.incomingDataItems.each(dataItem => {
        if (dataItem.fromNode) {
          dataItem.link.isHover = trueFalse;
          dataItem.fromNode.label.isHover = trueFalse;
        }
      });

      node.label.isHover = trueFalse;
    };

    nodeTemplate.events.on("over", rolledOver);
    nodeTemplate.events.on("out", rolledOver);

    let label = nodeTemplate.label;
    label.relativeRotation = 90;

    label.fillOpacity = 0.4;
    let labelHoverState = label.states.create("hover");
    labelHoverState.properties.fillOpacity = 1;

    // link template
    let linkTemplate = chart.links.template;
    linkTemplate.strokeOpacity = 0;
    linkTemplate.fillOpacity = 0.15;
    linkTemplate.tooltipText = "{fromName} & {toName}:{value.value}";

    let hoverState = linkTemplate.states.create("hover");
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.strokeOpacity = 0.7;

    linkTemplate.events.on(
      "hit",
      e => {
        const data = {
          from: e.target.dataItem.dataContext.from,
          fromID: e.target.dataItem.dataContext.fromID,
          to: e.target.dataItem.dataContext.to,
          toID: e.target.dataItem.dataContext.toID
        };
        this.handleHit(data);
      },
      this
    );

    return chart;
  }

  handleHit(data) {
    // If a link between 'author' and 'coAuthor' is hit, send the coAuthor's ID,
    // If a link between two coAuthors is hit, send the ID of the first one
    const coID = this.props.authorID === data.fromID ? data.toID : data.fromID;
    this.props.callback({ coID: coID });
  }

  componentWillUnmount() {
    if (this.chart) {
      console.log("attempting to dispose chord");
      this.chart.dispose();
    }
  }

  render() {
    return <div id="chordchart" style={this.props.style} />;
  }
}

export default AmChordChart;
