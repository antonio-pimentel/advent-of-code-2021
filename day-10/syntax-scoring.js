const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\r\n");

const delimiterMap = new Map([
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["<", ">"],
]);

const errorScoreMap = new Map([
  [")", 3],
  ["]", 57],
  ["}", 1197],
  [">", 25137],
]);

const completionScoreMap = new Map([
  [")", 1],
  ["]", 2],
  ["}", 3],
  [">", 4],
]);

let errorScore = 0;
const completionScores = [];

lineLoop: for (line of input) {
  const stack = [];
  for (char of line) {
    if (delimiterMap.has(char)) {
      stack.push(delimiterMap.get(char));
    } else if (char !== stack.pop()) {
      errorScore += errorScoreMap.get(char);
      continue lineLoop;
    }
  }
  if (stack.length > 0) {
    let lineCompScore = 0;
    while (stack.length > 0)
      lineCompScore = lineCompScore * 5 + completionScoreMap.get(stack.pop());
    completionScores.push(lineCompScore);
  }
}

const middleScore = completionScores.sort((a, b) => b - a)[
  Math.floor(completionScores.length / 2)
];

console.log({ errorScore, middleScore });
