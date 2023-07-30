const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n\r\n")
  .map((x) => x.split("\r\n"));

const template = input[0][0];
const rules = new Map(input[1].map((x) => x.split(" -> ")));

// --- Part One ---
{
  let prev = template;
  let newPolymer;
  for (let step = 0; step < 10; step++) {
    newPolymer = prev[0];
    for (let i = 1; i < prev.length; i++)
      newPolymer += rules.get(prev[i - 1] + prev[i]) + prev[i];
    prev = newPolymer;
  }

  const countMap = new Map();
  for (const char of newPolymer)
    countMap.set(char, (countMap.get(char) || 0) + 1);

  let max = 0;
  let min = Infinity;
  for (const x of countMap.values()) {
    if (x > max) max = x;
    if (x < min) min = x;
  }

  console.log(max - min);
}

// --- Part Two ---
{
  let pairsCount = new Map();
  for (let i = 1; i < template.length; i++) {
    const pair = template[i - 1] + template[i];
    pairsCount.set(pair, (pairsCount.get(pair) || 0) + 1);
  }

  for (let step = 0; step < 40; step++) {
    const newPairsCount = new Map();
    for (const [pair, count] of pairsCount) {
      const char = rules.get(pair);
      const p1 = pair[0] + char;
      const p2 = char + pair[1];
      newPairsCount.set(p1, (newPairsCount.get(p1) || 0) + count);
      newPairsCount.set(p2, (newPairsCount.get(p2) || 0) + count);
    }
    pairsCount = newPairsCount;
  }

  const charsCount = new Map();
  charsCount.set(template[0], (charsCount.get(template[0]) || 0) + 1);
  for (const [pair, count] of pairsCount)
    charsCount.set(pair[1], (charsCount.get(pair[1]) || 0) + count);

  let max = 0;
  let min = Infinity;
  for (const x of charsCount.values()) {
    if (x > max) max = x;
    if (x < min) min = x;
  }

  console.log(max - min);
}
