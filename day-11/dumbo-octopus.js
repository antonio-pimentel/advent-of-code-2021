const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map((line) => line.split("").map(Number));

function* neighbors(x, y, arr) {
  if (x > 0 && y > 0) yield [x - 1, y - 1];
  if (x > 0) yield [x - 1, y];
  if (x > 0 && y < arr[x].length - 1) yield [x - 1, y + 1];
  if (y > 0) yield [x, y - 1];
  if (y < arr[x].length - 1) yield [x, y + 1];
  if (x < arr.length - 1 && y > 0) yield [x + 1, y - 1];
  if (x < arr.length - 1) yield [x + 1, y];
  if (x < arr.length - 1 && y < arr[x].length - 1) yield [x + 1, y + 1];
}

const flash = (x, y, flashed) => {
  let flashes = 1;
  octopi[x][y] = 0;
  flashed.push(`${x},${y}`);
  for (const [i, j] of neighbors(x, y, octopi)) {
    if (flashed.includes(`${i},${j}`)) continue;
    octopi[i][j]++;
    if (octopi[i][j] > 9) flashes += flash(i, j, flashed);
  }
  return flashes;
};

// --- Part One ---

let octopi = input.map((line) => [...line]);
let totalFlashes = 0;
for (let step = 0; step < 100; step++) {
  for (let i = 0; i < octopi.length; i++)
    for (let j = 0; j < octopi[i].length; j++) octopi[i][j]++;

  const flashed = [];
  for (let i = 0; i < octopi.length; i++)
    for (let j = 0; j < octopi[i].length; j++)
      if (octopi[i][j] > 9) totalFlashes += flash(i, j, flashed);
}

console.log(totalFlashes);

// --- Part Two ---

octopi = input.map((line) => [...line]);
stepLoop: for (let step = 0; ; step++) {
  let stepFlashes = 0;
  for (let i = 0; i < octopi.length; i++)
    for (let j = 0; j < octopi[i].length; j++) octopi[i][j]++;

  const flashed = [];
  for (let i = 0; i < octopi.length; i++)
    for (let j = 0; j < octopi[i].length; j++)
      if (octopi[i][j] > 9) stepFlashes += flash(i, j, flashed);

  if (stepFlashes === octopi.length * octopi[0].length) {
    console.log(step + 1);
    break stepLoop;
  }
}
