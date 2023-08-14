const fs = require("fs");

const hexCode = fs.readFileSync("input.txt", "utf8");

const hex = BigInt("0x" + hexCode);
const bin = hex.toString(2);
const pad = "0".repeat(hexCode.length * 4 - bin.length);
const binCode = pad + bin;

let versionSum = 0;

const decodePacket = (code) => {
  const shiftCode = (idx) => {
    const s = code.slice(0, idx);
    code = code.slice(idx);
    return s;
  };

  const version = parseInt(shiftCode(3), 2);
  const type = parseInt(shiftCode(3), 2);
  versionSum += version;

  if (type === 4) {
    // literal
    let literal = "";
    let notLast;
    do {
      notLast = parseInt(shiftCode(1), 2);
      literal += shiftCode(4);
    } while (notLast);
    return [code, parseInt(literal, 2)];
  } else {
    // operator
    let val;
    const values = [];
    const lengthType = parseInt(shiftCode(1), 2);
    if (lengthType === 0) {
      const subPacketsLength = parseInt(shiftCode(15), 2);
      let subPacketsCode = shiftCode(subPacketsLength);
      while (subPacketsCode.length > 0) {
        [subPacketsCode, val] = decodePacket(subPacketsCode);
        values.push(val);
      }
    } else {
      const numberSubPackets = parseInt(shiftCode(11), 2);
      for (let i = 0; i < numberSubPackets; i++) {
        [code, val] = decodePacket(code);
        values.push(val);
      }
    }

    let value;
    if (type === 0) value = values.reduce((a, b) => a + b, 0);
    else if (type === 1) value = values.reduce((a, b) => a * b, 1);
    else if (type === 2)
      value = values.reduce((a, b) => (a < b ? a : b), Infinity);
    else if (type === 3)
      value = values.reduce((a, b) => (a > b ? a : b), -Infinity);
    else if (type === 5) value = values[0] > values[1] ? 1 : 0;
    else if (type === 6) value = values[0] < values[1] ? 1 : 0;
    else if (type === 7) value = values[0] === values[1] ? 1 : 0;

    return [code, value];
  }
};

const [_, packetValue] = decodePacket(binCode);

console.log({ versionSum, packetValue });
