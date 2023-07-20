const fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8").split(",").map(Number);

// --- Part One ---
{
  const fishes = [...input];

  for (let day = 0; day < 80; day++) {
    const dayStartFishNumber = fishes.length;
    for (let i = 0; i < dayStartFishNumber; i++)
      if (fishes[i] > 0) fishes[i]--;
      else {
        fishes.push(8);
        fishes[i] = 6;
      }
  }
  console.log(fishes.length);
}

// --- Part Two ---
{
  const fishes = [...input];

  let arr = new Array(9).fill(0);
  for (let fish of fishes) arr[fish]++;

  for (let day = 0; day < 256; day++) {
    const zeros = arr.shift();
    arr[8] = zeros;
    arr[6] += zeros;
  }

  const totalFish = arr.reduce((a, b) => a + b, 0);
  console.log(totalFish);
}
