const fs = require("fs");

const baseGrid = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map((x) => x.split("").map(Number));

// --- Part One ---

const findShortestPath = (baseGrid) => {
  function* neighbors(x, y) {
    if (x > 0) yield [x - 1, y];
    if (y > 0) yield [x, y - 1];
    if (x < grid[0].length - 1) yield [x + 1, y];
    if (y < grid.length - 1) yield [x, y + 1];
  }

  const start = { x: 0, y: 0 };
  const destination = { x: baseGrid[0].length - 1, y: baseGrid.length - 1 };

  const grid = baseGrid.map((row) =>
    row.map((x) => ({
      risk: x,
      dist: Infinity,
      visited: false,
    }))
  );
  grid[0][0].dist = 0;

  const prioQueue = [start];
  prioQueue.pushAndSink = (x, y) => {
    prioQueue.push({ x, y });
    for (let i = prioQueue.length - 1; i > 0; i--)
      if (grid[y][x].dist > grid[prioQueue[i - 1].y][prioQueue[i - 1].x].dist)
        [prioQueue[i], prioQueue[i - 1]] = [prioQueue[i - 1], prioQueue[i]];
      else break;
  };

  while (prioQueue.length > 0) {
    const { x, y } = prioQueue.pop();
    const v = grid[y][x];

    if (x === destination.x && y === destination.y) return v.dist;

    for ([nx, ny] of neighbors(x, y)) {
      const n = grid[ny][nx];
      if (n.visited) continue;
      if (v.dist + n.risk < n.dist) {
        n.dist = v.dist + n.risk;
        prioQueue.pushAndSink(nx, ny);
      }
    }
    v.visited = true;
  }
};

console.log(findShortestPath(baseGrid));

// --- Part Two ---

const repeats = 5;
const nRows = baseGrid.length;
const nCols = baseGrid[0].length;
for (const row of baseGrid)
  for (let r = 0; r < repeats - 1; r++)
    for (let x = 0; x < nCols; x++) row.push((row[x + r * nCols] % 9) + 1);
for (let r = 0; r < repeats - 1; r++)
  for (let y = 0; y < nRows; y++)
    baseGrid.push(baseGrid[y + r * nRows].map((x) => (x % 9) + 1));

console.log(findShortestPath(baseGrid));
