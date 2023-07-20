const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map((x) => {
    const arr = x.split(" | ");
    return {
      digits: new Set(arr[0].split(" ").map((x) => x.split(""))),
      display: arr[1].split(" ").map((x) => x.split("")),
    };
  });

// --- Part One ---
{
  const digitLengths = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
  const easyDigitsLengths = [1, 4, 7, 8].map((x) => digitLengths[x]);

  let countEasy = 0;
  for (const { _, display } of input)
    for (let number of display)
      if (easyDigitsLengths.includes(number.length)) countEasy++;

  console.log(countEasy);
}

// --- Part Two ---

// array 'a' contains every element of array 'b'
const contains = (a, b) => b.every((x) => a.includes(x));

let total = 0;
for (const { digits, display } of input) {
  const digitCodes = new Map();

  const mapAndDelete = (digit, code) => {
    digitCodes.set(digit, code);
    digits.delete(code);
  };

  for (const n of digits)
    if (n.length === 2) mapAndDelete(1, n);
    else if (n.length === 3) mapAndDelete(7, n);
    else if (n.length === 4) mapAndDelete(4, n);
    else if (n.length === 7) mapAndDelete(8, n);

  for (const n of digits)
    if (n.length === 6 && contains(n, digitCodes.get(4))) mapAndDelete(9, n);

  for (const n of digits)
    if (n.length === 6)
      if (contains(n, digitCodes.get(1))) mapAndDelete(0, n);
      else mapAndDelete(6, n);

  for (const n of digits)
    if (n.length === 5 && contains(n, digitCodes.get(1))) mapAndDelete(3, n);

  const topLeftSegment = digitCodes
    .get(9)
    .filter((x) => !digitCodes.get(3).includes(x))[0];

  for (const n of digits)
    if (n.includes(topLeftSegment)) mapAndDelete(5, n);
    else mapAndDelete(2, n);

  const codeToDigit = (code) => {
    for (let i of digitCodes.keys())
      if (
        digitCodes.get(i).length === code.length &&
        contains(digitCodes.get(i), code)
      )
        return i;
    throw new Error("Cannot translate code");
  };
  total += parseInt(display.map(codeToDigit).join(""));
}

console.log(total);
