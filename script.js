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

  getColor();
  // console.log(HTML);
}

function getColor() {
  HTML.input.addEventListener("input", (elm) => {
    let pickedColorValue = HTML.input.value;
    let hexColorValue, rgbColorValue, cssColorValue, hslColorValue;

    // HEX
    hexColorValue = `${pickedColorValue}`;
    // console.log(hexColorValue);

    // RGB
    rgbColorValue = hexToRGB(hexColorValue);
    // console.log(rgbColorValue);

    // CSS
    cssColorValue = rgbToCSS(rgbColorValue);
    // console.log(cssColorValue);

    // HSL
    hslColorValue = rgbToHSL(rgbColorValue);
    // console.log(hslColorValue);

    // RGB to HEX
    // rgbToHex(rgbColorValue);

    displayColors(hexColorValue, rgbColorValue, cssColorValue, hslColorValue);
  });
}

function hexToRGB(hexCode) {
  // console.log("hexToRGB");
  let r = parseInt(hexCode.substring(1, 3), 16);
  let g = parseInt(hexCode.substring(3, 5), 16);
  let b = parseInt(hexCode.substring(5, 7), 16);

  let rgbObj = { r, g, b };
  return rgbObj;
}

function rgbToCSS(rgbObj) {
  let r = rgbObj.r;
  let g = rgbObj.g;
  let b = rgbObj.b;

  let rgbCSS = `rgb(${r},${g},${b})`;
  return rgbCSS;
}

function rgbToHex(rgbObj) {
  // console.log("rgbToHex");
  let r = rgbObj.r;
  let g = rgbObj.g;
  let b = rgbObj.b;
  let hexCode =
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
  // console.log(`#${hexCode}`);
  return `#${hexCode}`;
}

function rgbToHSL(rgbObj) {
  // console.log("rgbToHSL");

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

  let hslObj = { h, s, l };
  return hslObj;
}

function changeColorBox(getColor) {
  HTML.colorBox.style.backgroundColor = `${getColor}`;
  HTML.colorBody.style.backgroundColor = `${getColor}`;
  // showHex(getColor);
}

function showHex(hex) {
  HTML.hexValue.textContent = hex;
  console.log(hex);
  // hexToRGB(hex);
}

function showRGB(rgbObj) {
  HTML.rgbValue.textContent = `rgb(${rgbObj.r}, ${rgbObj.r}, ${rgbObj.r})`;
  // rgbToHSL(rgbObj);
}

function showHSL(hslObj) {
  HTML.hslValue.textContent =
    "hsl: " + hslObj.h.toFixed(0) + "%. " + hslObj.s.toFixed(0) + "%. " + hslObj.l.toFixed(0) + "%";
}
