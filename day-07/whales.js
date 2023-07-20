const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split(",").map(Number);
const ordered = input.sort((a, b) => a - b);

// --- Part One ---
{
  const median1 = ordered[Math.floor(input.length / 2)];
  const median2 = ordered[Math.floor(input.length / 2) + 1];

  const optimal = { pos: null, distance: Infinity };
  for (let i = median1; i <= median2; i++) {
    const sum = input.reduce((acc, x) => acc + Math.abs(x - i), 0);
    if (sum < optimal.distance) {
      optimal.distance = sum;
      optimal.pos = i;
    }
  }

  console.log(optimal);
}

// --- Part Two ---
{
  const min = ordered[0];
  const max = ordered[ordered.length - 1];

  const optimal = { pos: null, cost: Infinity };
  for (let i = min; i <= max; i++) {
    const cost = input.reduce((acc, x) => {
      const distance = Math.abs(x - i);
      return acc + (distance + 1) * (distance / 2);
    }, 0);
    if (cost < optimal.cost) {
      optimal.cost = cost;
      optimal.pos = i;
    }
  }

  console.log(optimal);
}
