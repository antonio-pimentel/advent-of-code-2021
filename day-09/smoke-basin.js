const fs = require("fs");

const points = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map((line) => line.split("").map((x) => parseInt(x)));

// --- Part One ---

const lowPoints = [];
for (let i = 0; i < points.length; i++) {
  for (let j = 0; j < points[i].length; j++) {
    if (i > 0 && points[i][j] >= points[i - 1][j]) continue;
    if (j > 0 && points[i][j] >= points[i][j - 1]) continue;
    if (i < points.length - 1 && points[i][j] >= points[i + 1][j]) continue;
    if (j < points[i].length - 1 && points[i][j] >= points[i][j + 1]) continue;
    lowPoints.push([i, j]);
  }
}
console.log(lowPoints.reduce((acc, [x, y]) => acc + points[x][y] + 1, 0));

// --- Part Two ---

const explore = (x, y) => {
  let basinSize = 1;
  points[x][y] = 9;
  if (x > 0 && points[x - 1][y] < 9) basinSize += explore(x - 1, y);
  if (y > 0 && points[x][y - 1] < 9) basinSize += explore(x, y - 1);
  if (x < points.length - 1 && points[x + 1][y] < 9)
    basinSize += explore(x + 1, y);
  if (y < points[x].length - 1 && points[x][y + 1] < 9)
    basinSize += explore(x, y + 1);
  return basinSize;
};

const basinSizes = lowPoints.map(([x, y]) => explore(x, y));

console.log(
  basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, x) => acc * x, 1)
);
