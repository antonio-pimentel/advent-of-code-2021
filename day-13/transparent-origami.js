const fs = require("fs");

const [dotsArr, instrucitons] = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n\r\n")
  .map((x) => x.split("\r\n"));

const dots = new Set(dotsArr);
const folds = instrucitons
  .map((x) => x.split(" ")[2].split("="))
  .map((x) => [x[0], parseInt(x[1])]);

// --- Part One ---

const [foldAxis, foldPosition] = folds.shift();
for (const p of dots) {
  const [x, y] = p.split(",").map((x) => parseInt(x));
  if (foldAxis === "x" && x > foldPosition) {
    dots.add(`${foldPosition - (x - foldPosition)},${y}`);
    dots.delete(p);
  } else if (foldAxis === "y" && y > foldPosition) {
    dots.add(`${x},${foldPosition - (y - foldPosition)}`);
    dots.delete(p);
  }
}

console.log(dots.size);

// --- Part Two ---

for (const [foldAxis, foldPosition] of folds) {
  for (const p of dots) {
    const [x, y] = p.split(",").map((x) => parseInt(x));
    if (foldAxis === "x" && x > foldPosition) {
      dots.add(`${foldPosition - (x - foldPosition)},${y}`);
      dots.delete(p);
    } else if (foldAxis === "y" && y > foldPosition) {
      dots.add(`${x},${foldPosition - (y - foldPosition)}`);
      dots.delete(p);
    }
  }
}

let maxX = -Infinity;
let maxY = -Infinity;
for (const p of dots) {
  const [x, y] = p.split(",").map((x) => parseInt(x));
  maxX = Math.max(maxX, x);
  maxY = Math.max(maxY, y);
}

for (let y = 0; y <= maxY; y++) {
  let line = "";
  for (let x = 0; x <= maxX; x++) {
    line += dots.has(`${x},${y}`) ? "#" : ".";
  }
  console.log(line);
}
