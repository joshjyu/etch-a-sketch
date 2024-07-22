const container = document.querySelector(".container");

for (let i = 0; i < 256; i++) {
  const div = document.createElement("div");
  div.classList.add("gridDiv");
  container.appendChild(div);
}

const gridDiv = document.querySelectorAll(".gridDiv");
for (let i = 0; i < gridDiv.length; i++) {
  gridDiv[i].addEventListener("mouseenter", () => {
    gridDiv[i].setAttribute("style", "background: #c0d2f3;")
  });
  gridDiv[i].addEventListener("mouseleave", () => {
    gridDiv[i].setAttribute("style", "background: #ffffff;")
  });
}
