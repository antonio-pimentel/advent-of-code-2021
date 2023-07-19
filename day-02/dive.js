const fs = require("fs");

const commands = fs.readFileSync("input.txt", "utf8").split("\r\n");

// --- Part One ---
{
  let x = 0;
  let depth = 0;

  for (const command of commands) {
    const [direction, distanceStr] = command.split(" ");
    const distance = parseInt(distanceStr);

    if (direction === "forward") x += distance;
    else if (direction === "down") depth += distance;
    else if (direction === "up") depth -= distance;
  }

  console.log(x, depth, x * depth);
}

// --- Part Two ---
{
  let x = 0;
  let depth = 0;
  let aim = 0;

  for (const command of commands) {
    const [direction, distanceStr] = command.split(" ");
    const distance = parseInt(distanceStr);

    if (direction === "down") aim += distance;
    else if (direction === "up") aim -= distance;
    else if (direction === "forward") {
      x += distance;
      depth += aim * distance;
    }
  }

  console.log(x, depth, x * depth);
}
