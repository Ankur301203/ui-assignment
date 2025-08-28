const rows = 20;
const cols = 20;
let grid = [];
let mode = "wall";
let start = null, end = null;

const gridDiv = document.getElementById("grid");
for (let r = 0; r < rows; r++) {
  grid[r] = [];
  for (let c = 0; c < cols; c++) {
    const cell = document.createElement("div");
    cell.id = `cell-${r}-${c}`;
    cell.classList.add("cell");
    cell.dataset.row = r;
    cell.dataset.col = c;
    cell.addEventListener("click", () => handleCellClick(r, c));
    gridDiv.appendChild(cell);
    grid[r][c] = "empty";
    sleep(30);
  }
}

function setMode(m) {
  mode = m;
}

function handleCellClick(r, c) {
  const cell = document.getElementById(`cell-${r}-${c}`);
  if (mode === "start") {
    if (start) document.getElementById(`cell-${start[0]}-${start[1]}`).classList.remove("start");
    start = [r, c];
    cell.classList.add("start");
    grid[r][c] = "start";
  } 
  else if (mode === "end") {
    if (end) document.getElementById(`cell-${end[0]}-${end[1]}`).classList.remove("end");
    end = [r, c];
    cell.classList.add("end");
    grid[r][c] = "end";
  } 
  else if (mode === "wall") {
    if (grid[r][c] === "wall") {
      grid[r][c] = "empty";
      cell.classList.remove("wall");
    } 
    else {
      grid[r][c] = "wall";
      cell.classList.add("wall");
    }
  }
}

function bfs() {
  if (!start || !end) {
    alert("Please set Start and End points first!");
    return;
  }

  let queue = [start];
  let visited = new Set();
  let parent = {};
  let flag = false;

  visited.add(start.toString());

  while (queue.length > 0) {
    let [r, c] = queue.shift();

    if (!(r === start[0] && c === start[1]) && !(r === end[0] && c === end[1])) {
      document.getElementById(`cell-${r}-${c}`).classList.add("visited");
    //   await sleep(30);
    }

    if (r === end[0] && c === end[1]) {
        flag = true;
      break;
    }

    for (let [dr, dc] of [[1,0], [-1,0], [0,1], [0,-1]]) {
      let nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        if ((grid[nr][nc] === "empty" || grid[nr][nc] === "end") && !visited.has([nr,nc].toString())) {
          queue.push([nr, nc]);
          visited.add([nr,nc].toString());
          parent[[nr,nc]] = [r, c];
        }
      }
    }
  }
  if(!flag){
    alert("No possilbe path found");
    return;
  }
  

  let cur = end;
  while (parent[cur]) {
    let [r, c] = cur;
    if (!(r === start[0] && c === start[1]) && !(r === end[0] && c === end[1])) {
      document.getElementById(`cell-${r}-${c}`).classList.remove("visited");
      document.getElementById(`cell-${r}-${c}`).classList.add("path");
    //   await sleep(50);
    }
    cur = parent[cur];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clearGrid() {
  gridDiv.innerHTML = "";
  grid = [];
  start = null;
  end = null;
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.id = `cell-${r}-${c}`;
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", () => handleCellClick(r, c));
      gridDiv.appendChild(cell);
      grid[r][c] = "empty";
    }
  }
}
