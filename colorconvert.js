"use strict";

window.addEventListener("DOMContentLoaded", start)

function start(){
    let colorPicker = document.querySelector("input")
    colorPicker.addEventListener("input", getColor, false)
    colorPicker.addEventListener("change", trackColor, false)
    getColor()
}
function getColor() {
    let color = document.querySelector("input").value
    console.log(color) // redeclare the variable in the right function so it gets the right color. 
}

function trackColor(event) {
    let currentColor = event.target.value
    transformColorFunc(currentColor)
}

function transformColorFunc(hexNum) {
let rgbNum = transformColorRgb(hexNum);
console.log("RGB num is " +rgbNum);
let hslNum = transformColorHsl(rgbNum);
console.log(hslNum)
  displayColors(hexNum, rgbNum, hslNum)
}

function transformColorRgb(hexNum) {
    console.log ("hexNum is " + hexNum); 
    let hexNumberOnly = hexNum.substring(1) //we remove the hashtag and divide the string into three rgb components
    let redPart = hexNumberOnly.substring(0,2);
    console.log("redpart is " + redPart)
    let greenPart = hexNumberOnly.substring(2,4);
    console.log("greenpart is " + greenPart)
    let bluePart = hexNumberOnly.substring(4);
    console.log("bluepart is " + bluePart);
    // actual format transformation
    let red = transformRedPart(redPart);
    console.log("red transformed is" + red)
    let green = transformGreenPart(greenPart);
    console.log("green transformed is" + green)
    let blue = transformBluePart(bluePart);
    console.log("blue transformed is" + blue)
    return `${red}, ${green}, ${blue}`
}
function transformRedPart(redPart) {
 const redParsed = parseInt(redPart, 16);
 return redParsed
}
function transformGreenPart(greenPart) {
    const greenParsed = parseInt(greenPart, 16);
 return greenParsed
}
function transformBluePart(bluePart) {
    const blueParsed = parseInt(bluePart, 16);
 return blueParsed
}

function transformColorHsl(rgbNum) {
   let rgbNoCommas = rgbNum.replaceAll(",", "");
   let firstSpace = rgbNoCommas.indexOf(" ");
   let lastSpace = rgbNoCommas.lastIndexOf(" ");
   let r = Number(rgbNoCommas.substring(0, firstSpace));
   let g = Number(rgbNoCommas.substring(firstSpace+1, lastSpace))
   let b = Number(rgbNoCommas.substring(lastSpace+1))
   console.log("R is " + r)
   console.log("G is " + g)
   console.log("B is " + b)

  r /= 255;
   g /= 255;
   b /= 255;
 
   let h, s, l;
 
   const min = Math.min(r,g,b);
   const max = Math.max(r,g,b);
  
   if( max === min ) {
     h = 0;
   } else
   if (max === r) {
     h = 60 * (0 + (g - b) / (max - min) );
   } else
   if (max === g) {
     h = 60 * (2 + (b - r) / (max - min) );
   } else
   if (max === b) {
     h = 60 * (4 + (r - g) / (max - min) );
   }
  
   if (h < 0) {h = h + 360; }
  
   l = (min + max) / 2;
  
   if (max === 0 || min === 1 ) {
     s = 0;
   } else {
     s = (max - l) / ( Math.min(l,1-l));
   }
   // multiply s and l by 100 to get the value in percent, rather than [0,1]
   s *= 100;
   l *= 100;
   h = h.toFixed(2)
   s = s.toFixed(2)
   l = l.toFixed(2)
 
   console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
   return h + ", "+ s + ", " + l 
}
function displayColors(hexNum, rgbNum, hslNum) {
    document.querySelector("#hex p").textContent = hexNum;
    document.querySelector("#rgb p").textContent = rgbNum;
    document.querySelector("#hsl p").textContent = hslNum; //we still need to add the % after the second and third number
}