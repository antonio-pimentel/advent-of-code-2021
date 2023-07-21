const fs = require("fs");

const edges = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map((line) => line.split("-"));

const edgeMap = new Map();
for (const [a, b] of edges) {
  if (!edgeMap.has(a)) edgeMap.set(a, []);
  if (!edgeMap.has(b)) edgeMap.set(b, []);
  if (a !== "end" && b !== "start") edgeMap.get(a).push(b);
  if (a !== "start" && b !== "end") edgeMap.get(b).push(a);
}

// --- Part One ---

const explore = (v, path) => {
  if (v === "end") return 1;
  else
    return edgeMap
      .get(v)
      .filter((w) => w === w.toUpperCase() || !path.includes(w))
      .reduce((acc, w) => acc + explore(w, [...path, w]), 0);
};

const nPaths = explore("start", ["start"]);
console.log(nPaths);

// --- Part Two ---

const exploreMore = (v, smallVisited, twice) => {
  if (v === "end") return 1;
  else {
    let nPaths = 0;
    for (const w of edgeMap.get(v)) {
      if (w === w.toUpperCase()) nPaths += exploreMore(w, smallVisited, twice);
      else if (!smallVisited.includes(w))
        nPaths += exploreMore(w, [...smallVisited, w], twice);
      else if (!twice) nPaths += exploreMore(w, smallVisited, true);
    }
    return nPaths;
  }
};

console.log(exploreMore("start", [], false));
