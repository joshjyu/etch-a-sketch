const container = document.querySelector(".container");
const gridDensityPrompt = document.querySelector("#prompt");
const gridClear = document.querySelector("#clear");
let gridLength = 16;

container.addEventListener("mousedown", etchEventHandler);
container.addEventListener("mouseover", etchEventHandler);
gridDensityPrompt.addEventListener("click", setGridDensity);
gridClear.addEventListener("click", clearGrid);

let isMouseDown = false;
document.body.addEventListener("mousedown", (event) => {
  if (event.button == 0) {
    isMouseDown = true;
  }
});
document.body.addEventListener("mouseup", (event) => {
  if (event.button == 0) {
    isMouseDown = false;
  }
});

function drawGrid() {
  for (let i = 0; i < Math.pow(gridLength, 2); i++) {
    const div = document.createElement("div");
    div.classList.add("gridDiv");
    div.style.cssText = `flex: 0 1 ${100 / gridLength}%; background-color: white;`;
    container.appendChild(div);
  }
}

function etchEventHandler(event) {
  if (event.type === "mouseover" && !isMouseDown) return;
  if (event.button > 0) return;
  
  const el = event.target;
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  if (el.classList.contains("gridDiv")) {
    el.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
  }
}

function setGridDensity() {
  gridLength = prompt(
    "Enter a value between 16 and 100 to set as the number of squares per side of the grid.",
  ).trim();

  while (!(gridLength >= 16 && gridLength <= 100)) {
    gridLength = prompt(
      "That is not a number between 16 and 100. Please enter a grid side length between 16 and 100.",
    ).trim();
  }

  const containerNode = document.querySelector(".container");
  while (containerNode.firstChild) {
    containerNode.removeChild(containerNode.lastChild);
  }

  drawGrid();
}

function clearGrid() {
  const gridSquares = document.querySelectorAll(".gridDiv");
  for (let i = 0; i < gridSquares.length; i++) {
    gridSquares[i].setAttribute(
      "style",
      `flex: 0 1 ${100 / gridLength}%; background-color: white;`,
    );
  }
}

drawGrid();
