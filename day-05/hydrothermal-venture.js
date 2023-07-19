const fs = require("fs");

let vents = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map((line) => line.split(" -> "))
  .map((line) => line.map((point) => point.split(",").map((x) => parseInt(x))))
  .map(([a, b]) => ({ x1: a[0], y1: a[1], x2: b[0], y2: b[1] }));

// --- Part One ---

// vents = vents.filter((vent) => vent.x1 === vent.x2 || vent.y1 === vent.y2);

// --- Part Two ---

const map = new Map();

const mapPoint = (x, y) => {
  const key = `${x},${y}`;
  if (map.has(key)) map.set(key, map.get(key) + 1);
  else map.set(key, 1);
};

for (const { x1, x2, y1, y2 } of vents) {
  const mx = x1 === x2 ? 0 : x2 > x1 ? 1 : -1;
  const my = y1 === y2 ? 0 : y2 > y1 ? 1 : -1;
  for (
    let x = x1, y = y1;
    (x2 > x1 ? x <= x2 : x >= x2) && (y2 > y1 ? y <= y2 : y >= y2);
    x += mx, y += my
  )
    mapPoint(x, y);
}

let dangerPoints = 0;
for (const value of map.values()) if (value > 1) dangerPoints++;

console.log(dangerPoints);
