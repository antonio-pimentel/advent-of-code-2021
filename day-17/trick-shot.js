const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const [[minX, maxX], [minY, maxY]] = [
  ...input.matchAll(/-?(\d+)\.\.-?(\d+)/g),
].map((m) => m[0].split("..").map(Number));

// --- Part One ---

(() => {
  for (let yStartVel = -minY; yStartVel >= maxY; yStartVel--) {
    let yPos = 0;
    let highestPos = 0;
    for (let stepY = 0; ; stepY++) {
      yPos += yStartVel - stepY;
      if (yPos > highestPos) highestPos = yPos;
      if (yPos < minY) break;
      if (yPos <= maxY)
        for (let xStartVel = 0; xStartVel <= maxX; xStartVel++) {
          let xPos = 0;
          let stepX = 0;
          for (let xCurrVel = xStartVel; xCurrVel >= 0; xCurrVel--) {
            xPos += xCurrVel;
            stepX++;
            if (xPos > maxX || stepX > stepY) break;
            if (xPos > minX && (stepX === stepY || xCurrVel === 0))
              return console.log({ xStartVel, yStartVel, highestPos });
          }
        }
    }
  }
})();

// --- Part Two ---

let distinct = new Set();
for (let yStartVel = 0 - minY; yStartVel >= minY; yStartVel--) {
  let yPos = 0;
  for (let stepY = 1; ; stepY++) {
    yPos += yStartVel - stepY;
    if (yPos < minY) break;
    if (yPos <= maxY)
      for (let xStartVel = 0; xStartVel <= maxX; xStartVel++) {
        let xPos = 0;
        let stepX = 0;
        for (let xCurrVel = xStartVel; xCurrVel >= 0; xCurrVel--) {
          xPos += xCurrVel;
          stepX++;
          if (xPos > maxX || stepX > stepY) break;
          if (xPos >= minX && (stepX === stepY || xCurrVel === 0))
            distinct.add(`${xStartVel},${yStartVel}`);
        }
      }
  }
}
console.log(distinct.size);
