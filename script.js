`use strict`;

window.addEventListener("DOMContentLoaded", setup);

const HTML = {};

function setup() {
  console.log("setup");
  HTML.input = document.querySelector("#colorwheel");
  HTML.colorCodes = document.querySelector("#colorCodes");
  HTML.hexValue = document.querySelector(".hex");
  HTML.rgbValue = document.querySelector(".rgb");
  HTML.hslValue = document.querySelector(".hsl");
  HTML.colorBox = document.querySelector(".color_box");
  HTML.colorBody = document.querySelector("body");

  HTML.hexValue.textContent = HTML.input.value;
  HTML.rgbValue.textContent = "rgb(255, 255, 255)";
  HTML.hslValue.textContent = "hsl: 0, 0, 100";
  HTML.colorBox.style.backgroundColor = `${HTML.input.value}`;

  HTML.input.addEventListener("input", getColor);
  // console.log(HTML);
}

function getColor() {
  changeColorBox(HTML.input.value);
}

function changeColorBox(getColor) {
  HTML.colorBox.style.backgroundColor = `${getColor}`;
  HTML.colorBody.style.backgroundColor = `${getColor}`;
  showHex(getColor);
}

function showHex(hex) {
  HTML.hexValue.textContent = hex;
  console.log(hex);
  hexToRGB(hex);
}

//Convert from hex to integer
function hexToRGB(hexCode) {
  console.log("hexToRGB");
  console.log(hexCode);
  let r = parseInt(hexCode.substring(1, 3), 16);
  let g = parseInt(hexCode.substring(3, 5), 16);
  let b = parseInt(hexCode.substring(5, 7), 16);
  // console.log(`{r: ${r}, g: ${g}, b: ${b}}`);

  let rgbObj = { r, g, b };
  showRGB(rgbObj);
}

function showRGB(rgbObj) {
  HTML.rgbValue.textContent = `rgb(${rgbObj.r}, ${rgbObj.r}, ${rgbObj.r})`;
  rgbToHSL(rgbObj);
}

function rgbToHSL(rgbObj) {
  console.log("rgbToHSL");

  let r = rgbObj.r;
  let g = rgbObj.g;
  let b = rgbObj.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing

  let hslObj = { h, s, l };
  showHSL(hslObj);
}

function showHSL(hslObj) {
  HTML.hslValue.textContent =
    "hsl: " + hslObj.h.toFixed(0) + "%. " + hslObj.s.toFixed(0) + "%. " + hslObj.l.toFixed(0) + "%";
}
