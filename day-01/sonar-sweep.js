const fs = require("fs");

const measurements = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((n) => parseInt(n));

// --- Part One ---
{
  let increases = 0;
  for (let i = 1; i < measurements.length; i++)
    if (measurements[i] > measurements[i - 1]) increases++;

  console.log(increases);
}

// --- Part Two ---
{
  let windowIncreases = 0;
  for (let i = 1; i < measurements.length - 2; i++)
    if (measurements[i + 2] > measurements[i - 1]) windowIncreases++;

  console.log(windowIncreases);
}
