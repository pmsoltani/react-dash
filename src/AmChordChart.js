import React, { Component } from "react";
import PropTypes from "prop-types";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
// import "./AmChordChart.css";

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

const data = [
  { from: "F", to: "P", value: 18 },
  { from: "Fa", to: "Ra", value: 22 },
  { from: "K", to: "R", value: 7 },
  { from: "D", to: "Ai", value: 7 },
  { from: "Ai", to: "MA", value: 51 },
  { from: "Sh", to: "Ab", value: 29 },
  { from: "Sh", to: "Sha", value: 4 },
  { from: "B", to: "He", value: 6 },
  { from: "P", to: "Ot", value: 5 },
  { from: "P", to: "Za", value: 4 },
  { from: "Gh", to: "Fa", value: 19 },
  { from: "Am", to: "Fa", value: 8 },
  { from: "Ai", to: "J", value: 7 },

  { from: "F", to: "Sh", value: 12 },
  { from: "F", to: "B", value: 6 },
  { from: "F", to: "AJ", value: 5 },
  { from: "F", to: "D", value: 15 },
  { from: "F", to: "S", value: 48 },
  { from: "F", to: "Af", value: 32 },
  { from: "F", to: "DG", value: 5 },
  { from: "F", to: "RG", value: 6 },
  { from: "F", to: "L", value: 30 },
  { from: "F", to: "K", value: 6 },
  { from: "F", to: "Ra", value: 22 },
  { from: "F", to: "R", value: 7 },
  { from: "F", to: "Ai", value: 7 },
  { from: "F", to: "MA", value: 51 },
  { from: "F", to: "Ab", value: 29 },
  { from: "F", to: "Sha", value: 4 },
  { from: "F", to: "He", value: 6 },
  { from: "F", to: "Ot", value: 5 },
  { from: "F", to: "Za", value: 4 },
  { from: "F", to: "Fa", value: 19 },
  { from: "F", to: "Fa", value: 8 },
  { from: "F", to: "J", value: 7 },
  { from: "F", to: "Gh", value: 5 },
  { from: "F", to: "Am", value: 2 }
];

class AmChordChart extends Component {
  constructor(props) {
    super(props);
    this.state = { papers: null, citations: null };
  }

  handleHit(data) {
    this.props.callback(data);
  }

  componentDidMount() {
    let chart = am4core.create("chordchart", am4charts.ChordDiagram);

    chart.paddingLeft = 0;
    chart.paddingRight = 0;

    chart.colors.saturation = 0.45;
    chart.colors.step = 3;

    chart.data = data;

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

    // when rolled over the node, make all the links rolled-over
    nodeTemplate.events.on("over", function(event) {
      let node = event.target;
      node.outgoingDataItems.each(function(dataItem) {
        if (dataItem.toNode) {
          dataItem.link.isHover = true;
          dataItem.toNode.label.isHover = true;
        }
      });
      node.incomingDataItems.each(function(dataItem) {
        if (dataItem.fromNode) {
          dataItem.link.isHover = true;
          dataItem.fromNode.label.isHover = true;
        }
      });

      node.label.isHover = true;
    });

    // when rolled out from the node, make all the links rolled-out
    nodeTemplate.events.on("out", function(event) {
      let node = event.target;
      node.outgoingDataItems.each(function(dataItem) {
        if (dataItem.toNode) {
          dataItem.link.isHover = false;
          dataItem.toNode.label.isHover = false;
        }
      });
      node.incomingDataItems.each(function(dataItem) {
        if (dataItem.fromNode) {
          dataItem.link.isHover = false;
          dataItem.fromNode.label.isHover = false;
        }
      });

      node.label.isHover = false;
    });

    let label = nodeTemplate.label;
    label.relativeRotation = 90;

    label.fillOpacity = 0.4;
    let labelHS = label.states.create("hover");
    labelHS.properties.fillOpacity = 1;

    // link template
    let linkTemplate = chart.links.template;
    linkTemplate.strokeOpacity = 0;
    linkTemplate.fillOpacity = 0.15;
    linkTemplate.tooltipText = "{fromName} & {toName}:{value.value}";

    linkTemplate.events.on(
      "hit",
      e => {
        const data = {
          papers: e.target.dataItem.dataContext.from,
          citations: e.target.dataItem.dataContext.to
        };
        this.handleHit(data);
      },
      this
    );

    let hoverState = linkTemplate.states.create("hover");
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.strokeOpacity = 0.7;

    let slice = chart.nodes.template.slice;
    slice.stroke = am4core.color("#000");
    slice.strokeOpacity = 0.5;
    slice.strokeWidth = 1;
    slice.cornerRadius = 8;
    slice.innerCornerRadius = 0;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="chordchart" style={this.props.style} />;
  }
}

AmChordChart.protoTypes = {
  callback: PropTypes.func
};

export default AmChordChart;
