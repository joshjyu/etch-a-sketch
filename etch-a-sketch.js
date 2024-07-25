const container = document.querySelector(".container");
const gridLengthPrompt = document.querySelector("#prompt");
const gridClear = document.querySelector("#clear");
// Default grid side length
let gridLength = 16;

container.addEventListener("mousedown", etchEventHandler);
container.addEventListener("mouseover", etchEventHandler);
gridLengthPrompt.addEventListener("click", setGridDensity);
gridClear.addEventListener("click", clearGrid);

// Declare variable to determine if left mouse click is pressed down or up
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
    // Flexbasis dynamically changes to percentage of container width to
    // create a square drawing grid
    div.style.cssText = `flex: 0 1 ${100 / gridLength}%; background-color: #f3f3f3;`;
    container.appendChild(div);
  }
}

function etchEventHandler(event) {
  // Function to recolor divs in drawing grid only if left click is pressed and
  // mouse is hovering over divs
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

  // Clear drawing grid by removing all divs before redrawing with new parameters
  const containerNode = document.querySelector(".container");
  while (containerNode.firstChild) {
    containerNode.removeChild(containerNode.lastChild);
  }

  drawGrid();
}

function clearGrid() {
  const gridSquares = document.querySelectorAll(".gridDiv");
  // If just clearing grid (without redrawing with new grid density), it's faster
  // to just recolor the grid and reset flex params
  for (let i = 0; i < gridSquares.length; i++) {
    gridSquares[i].setAttribute(
      "style",
      `flex: 0 1 ${100 / gridLength}%; background-color: #f3f3f3;`,
    );
  }
}

drawGrid();
