/*
Author: https://github.com/Amarok24
License: The Unlicense, http://unlicense.org

script version: 1.0
*/

const cout = console.log;
const cerr = console.error;

function decLength(d, limit = 10, retVal = 1) {
  // returns 1 if d=4, 2 if d=75, 3 if d=637 ...
  /* cout("d ", d);
        cout("limit ", limit);
        cout("retVal ", retVal); */
  if (d >= limit) {
    limit *= 10;
    retVal++;
    return decLength(d, limit, retVal);
  } else {
    return retVal;
  }
}

function splitDecimal(decNum) {
  // if 527 given it returns [500, 20, 7]
  let dLen = decLength(decNum);
  let arrDecimals = [];
  let z = Math.floor(10 ** dLen / 10); // z = 10^dLen / 10
  // z will be 1 if decNum=5, 10 if decNum=47, 100 if decNum=725 ...

  let tempDec = decNum;

  while (z !== 0) {
    // in this loop 'z' will be decremented 100 .. 10 .. 1 .. 0
    let x = Math.trunc(tempDec / z); // tempDec=725 --> 7.25 --> 7
    x = x * z; // 7 --> 700
    arrDecimals.push(x);
    tempDec = tempDec - x; // 725-700 = 25, 25-20 = 5
    z = Math.floor(z / 10); // will be 1/10 = 0 in last step
  }

  return arrDecimals;
}

function decToRoman(dec) {
  const decTable = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  const romTable = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M",
  ];
  let romanArr = [];
  let dSplitted = splitDecimal(dec);
  let i;

  cout(dSplitted);

  i = 0;
  while (i < dSplitted.length) {
    for (let t = decTable.length - 1; t >= 0; t--) {
      if (dSplitted[i] >= decTable[t]) {
        romanArr.push(romTable[t]);
        dSplitted[i] = dSplitted[i] - decTable[t];
        break;
      }

      if (dSplitted[i] === 0) {
        break;
      }
    }

    if (dSplitted[i] === 0) {
      i++;
    }
  }

  return romanArr.join("");
}

function buttonClick() {
  const dec = document.getElementById("decInput").value;
  const rom = decToRoman(dec);
  document.getElementById("romOutput").textContent = rom;
}

function main() {
  document.getElementById("convertButton").addEventListener("click", buttonClick);
}

document.addEventListener("DOMContentLoaded", main);