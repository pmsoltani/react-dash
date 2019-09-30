import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

am4core.useTheme(am4themes_animated);

// Data format
// [{ from: "author1", to: "author2", value: 5 }, ...]

class AmChordChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

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
      const response = await axios.get(`/a/${this.props.authorID}/network`);
      const chartData = response.data.map(item => {
        return {
          from: item.from.name,
          fromID: item.from.idFrontend,
          to: item.to.name,
          toID: item.to.idFrontend,
          value: item.value
        };
      });

      this.setState({ data: chartData }, () =>
        this.makeChordChart(this.state.data)
      );
    } catch (e) {
      this.setState({ data: [] });
    }
  }

  makeChordChart(data) {
    let chart = am4core.create("chordchart", am4charts.ChordDiagram);

    chart.paddingLeft = 0;
    chart.paddingRight = 0;

    chart.colors.saturation = 0.45;
    chart.colors.step = 4;

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
          from: e.target.dataItem.dataContext.from,
          fromID: e.target.dataItem.dataContext.fromID,
          to: e.target.dataItem.dataContext.to,
          toID: e.target.dataItem.dataContext.toID
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

    return chart;
  }

  handleHit(data) {
    const coID = this.props.authorID === data.fromID ? data.toID : data.fromID;
    this.props.callback({ coID: coID });
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

export default AmChordChart;
