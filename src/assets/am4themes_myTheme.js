import * as am4core from "@amcharts/amcharts4/core";
import palette from "./palette";

function am4themes_myTheme(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = palette.map(item => am4core.color(item));
    target.minLightness = 0.2;
    target.maxLightness = 0.7;
    target.reuse = true;
  }
}

export default am4themes_myTheme;
