const fs = require("fs");

let report = fs.readFileSync("input.txt", "utf8").split("\r\n");
let lineLength = report[0].length;

// --- Part One ---
{
  let countOnesArr = Array(lineLength).fill(0);
  for (const line of report)
    for (let i = 0; i < line.length; i++)
      if (line.charAt(i) === "1") countOnesArr[i]++;

  let gamma = "";
  let epsilon = "";

  for (const n of countOnesArr)
    if (n > report.length / 2) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }

  const powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2);

  console.log({ gamma, epsilon, powerConsumption });
}

// --- Part Two ---
{
  const filterArray = (arr, criteria) => {
    for (let i = 0; arr.length > 1 && i < lineLength; i++) {
      let zeros = 0;
      let ones = 0;

      for (line of arr)
        if (line[i] === "0") zeros++;
        else if (line[i] === "1") ones++;

      arr = arr.filter((line) => line[i] === criteria(zeros, ones));
    }

    return arr[0];
  };

  const oxygenBitCriteria = (zeros, ones) => (zeros > ones ? "0" : "1");
  const co2BitCriteria = (zeros, ones) => (ones < zeros ? "1" : "0");

  const oxygen = filterArray([...report], oxygenBitCriteria);
  const co2 = filterArray([...report], co2BitCriteria);

  const lifeSupportRating = parseInt(oxygen, 2) * parseInt(co2, 2);

  console.log({ oxygen, co2, lifeSupportRating });
}
