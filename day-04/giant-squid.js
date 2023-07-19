const fs = require("fs");

let [draw, ...boardsInput] = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n\r\n");

draw = draw.split(",");
boardsInput = boardsInput.map((board) =>
  board.split("\r\n").map((row) => row.split(" ").filter((x) => x !== ""))
);

// --- Part One ---

const calculateScore = (board, numbersDrawn) => {
  let sum = 0;
  for (const row of board)
    for (const cell of row)
      if (!numbersDrawn.includes(cell)) sum += parseInt(cell);

  return sum * parseInt(numbersDrawn[numbersDrawn.length - 1]);
};

const getWinningScore = (boards) => {
  for (let i = 0; i < draw.length; i++)
    boardLoop: for (const board of boards)
      for (let j = 0; j < board.length; j++)
        for (let k = 0; k < board[j].length; k++)
          if (board[j][k] === draw[i]) {
            board[`row${j}`] = board[`row${j}`] ? board[`row${j}`] + 1 : 1;
            board[`col${k}`] = board[`col${k}`] ? board[`col${k}`] + 1 : 1;
            if (board[`row${j}`] === 5 || board[`col${k}`] === 5)
              return calculateScore(board, draw.slice(0, i + 1));
            continue boardLoop;
          }
  throw new Error("No winner found");
};

console.log(getWinningScore(boardsInput.map((r) => r.slice())));

// --- Part Two ---

const getLoosingScore = (boards) => {
  let countBoardsWon = 0;
  for (let i = 0; i < draw.length; i++)
    boardLoop: for (const board of boards) {
      if (board.won) continue;
      for (let j = 0; j < board.length; j++)
        for (let k = 0; k < board[j].length; k++)
          if (board[j][k] === draw[i]) {
            board[`row${j}`] = board[`row${j}`] ? board[`row${j}`] + 1 : 1;
            board[`col${k}`] = board[`col${k}`] ? board[`col${k}`] + 1 : 1;
            if (board[`row${j}`] === 5 || board[`col${k}`] === 5)
              if (countBoardsWon < boards.length - 1) {
                board.won = true;
                countBoardsWon++;
              } else return calculateScore(board, draw.slice(0, i + 1));
            continue boardLoop;
          }
    }
  throw new Error("Some boards never won");
};

console.log(getLoosingScore(boardsInput.map((r) => r.slice())));
