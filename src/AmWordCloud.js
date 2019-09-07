import React, { Component } from "react";
import PropTypes from "prop-types";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
// import "./AmWordCloud.css";

// am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_material);

const data = [
  {
    word: "javascript",
    value: 1765836
  },
  {
    word: "java",
    value: 1517355
  },
  {
    word: "c#",
    value: 1287629
  },
  {
    word: "php",
    value: 1263946
  },
  {
    word: "android",
    value: 1174721
  },
  {
    word: "python",
    value: 1116769
  },
  {
    word: "jquery",
    value: 944983
  },
  {
    word: "html",
    value: 805679
  },
  {
    word: "c++",
    value: 606051
  },
  {
    word: "ios",
    value: 591410
  },
  {
    word: "css",
    value: 574684
  },
  {
    word: "mysql",
    value: 550916
  },
  {
    word: "sql",
    value: 479892
  },
  {
    word: "asp.net",
    value: 343092
  },
  {
    word: "ruby-on-rails",
    value: 303311
  },
  {
    word: "c",
    value: 296963
  },
  {
    word: "arrays",
    value: 288445
  },
  {
    word: "objective-c",
    value: 286823
  },
  {
    word: ".net",
    value: 280079
  },
  {
    word: "r",
    value: 277144
  },
  {
    word: "node.js",
    value: 263451
  },
  {
    word: "angularjs",
    value: 257159
  },
  {
    word: "json",
    value: 255661
  },
  {
    word: "sql-server",
    value: 253824
  },
  {
    word: "swift",
    value: 222387
  },
  {
    word: "iphone",
    value: 219827
  },
  {
    word: "regex",
    value: 203121
  },
  {
    word: "ruby",
    value: 202547
  },
  {
    word: "ajax",
    value: 196727
  },
  {
    word: "django",
    value: 191174
  },
  {
    word: "excel",
    value: 188787
  },
  {
    word: "xml",
    value: 180742
  },
  {
    word: "asp.net-mvc",
    value: 178291
  },
  {
    word: "linux",
    value: 173278
  },
  {
    word: "angular",
    value: 154447
  },
  {
    word: "database",
    value: 153581
  },
  {
    word: "wpf",
    value: 147538
  },
  {
    word: "spring",
    value: 147456
  },
  {
    word: "wordpress",
    value: 145801
  },
  {
    word: "python-3.x",
    value: 145685
  },
  {
    word: "vba",
    value: 139940
  },
  {
    word: "string",
    value: 136649
  },
  {
    word: "xcode",
    value: 130591
  },
  {
    word: "windows",
    value: 127680
  },
  {
    word: "reactjs",
    value: 125021
  },
  {
    word: "vb.net",
    value: 122559
  },
  {
    word: "html5",
    value: 118810
  },
  {
    word: "eclipse",
    value: 115802
  },
  {
    word: "multithreading",
    value: 113719
  },
  {
    word: "mongodb",
    value: 110348
  },
  {
    word: "laravel",
    value: 109340
  },
  {
    word: "bash",
    value: 108797
  },
  {
    word: "git",
    value: 108075
  },
  {
    word: "oracle",
    value: 106936
  },
  {
    word: "pandas",
    value: 96225
  },
  {
    word: "postgresql",
    value: 96027
  },
  {
    word: "twitter-bootstrap",
    value: 94348
  },
  {
    word: "forms",
    value: 92995
  },
  {
    word: "image",
    value: 92131
  },
  {
    word: "macos",
    value: 90327
  },
  {
    word: "algorithm",
    value: 89670
  },
  {
    word: "python-2.7",
    value: 88762
  },
  {
    word: "scala",
    value: 86971
  },
  {
    word: "visual-studio",
    value: 85825
  },
  {
    word: "list",
    value: 84392
  },
  {
    word: "excel-vba",
    value: 83948
  },
  {
    word: "winforms",
    value: 83600
  },
  {
    word: "apache",
    value: 83367
  },
  {
    word: "facebook",
    value: 83212
  },
  {
    word: "matlab",
    value: 82452
  },
  {
    word: "performance",
    value: 81443
  },
  {
    word: "css3",
    value: 78250
  },
  {
    word: "entity-framework",
    value: 78243
  },
  {
    word: "hibernate",
    value: 76123
  },
  {
    word: "typescript",
    value: 74867
  },
  {
    word: "linq",
    value: 73128
  },
  {
    word: "swing",
    value: 72333
  },
  {
    word: "function",
    value: 72043
  },
  {
    word: "amazon-web-services",
    value: 71155
  },
  {
    word: "qt",
    value: 69552
  },
  {
    word: "rest",
    value: 69138
  },
  {
    word: "shell",
    value: 68854
  },
  {
    word: "azure",
    value: 67431
  },
  {
    word: "firebase",
    value: 66411
  },
  {
    word: "api",
    value: 66158
  },
  {
    word: "maven",
    value: 66113
  },
  {
    word: "powershell",
    value: 65467
  },
  {
    word: ".htaccess",
    value: 65014
  },
  {
    word: "sqlite",
    value: 64888
  },
  {
    word: "file",
    value: 62783
  },
  {
    word: "codeigniter",
    value: 62393
  },
  {
    word: "unit-testing",
    value: 61909
  },
  {
    word: "perl",
    value: 61752
  },
  {
    word: "loops",
    value: 61015
  },
  {
    word: "symfony",
    value: 60820
  },
  {
    word: "selenium",
    value: 59855
  },
  {
    word: "google-maps",
    value: 59616
  },
  {
    word: "csv",
    value: 59600
  },
  {
    word: "uitableview",
    value: 59011
  },
  {
    word: "web-services",
    value: 58916
  },
  {
    word: "cordova",
    value: 58195
  },
  {
    word: "class",
    value: 58055
  },
  {
    word: "numpy",
    value: 57132
  },
  {
    word: "google-chrome",
    value: 56836
  },
  {
    word: "ruby-on-rails-3",
    value: 55962
  },
  {
    word: "android-studio",
    value: 55801
  },
  {
    word: "tsql",
    value: 55736
  },
  {
    word: "validation",
    value: 55531
  }
];

class AmWordCloud extends Component {
  constructor(props) {
    super(props);
    this.state = { papers: null, citations: null };
  }

  handleHit(data) {
    this.props.callback(data);
  }

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);

    chart.paddingLeft = 0;
    chart.paddingRight = 0;

    let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    series.data = data

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
          papers: e.target.dataItem.dataContext.word,
          citations: e.target.dataItem.dataContext.value
        };
        this.handleHit(data);
      },
      this
    );


    this.chart = chart;
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

AmWordCloud.protoTypes = {
  callback: PropTypes.func
};

export default AmWordCloud;
