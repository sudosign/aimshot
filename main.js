function createGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        var sect = document.createElement("section");
        sect.className = `section section-${i}`; 
        document.getElementById("container").appendChild(sect);

        for (let j = 0; j < gridSize; j++) {
            var button = document.createElement("button");

            button.className = `square square-${j}`; 

            button.style.margin = "0";
            button.style.padding = "0";
            button.style.border = "1px solid black"; 

            button.style.flex = "1";

            button.onclick = function () {
                this.style.backgroundColor = "black";
            };

            sect.appendChild(button);
        }
    }
}

function clearGrid() {
    // let gridSize;
    // do {
    //     gridSize = prompt("Please enter the new size of the grid:");
    // } while (gridSize > 100);

    while (document.getElementById("container").firstChild) {
        document.getElementById("container").removeChild(document.getElementById("container").lastChild);
    }

    // createGrid(gridSize);
    createGrid(4)
}

createGrid(4)

const resetButton = document.querySelector("#clear-button");
resetButton.onmousedown = clearGrid;

document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "r") { // Checks if the 'R' key is pressed
        clearGrid();
    }
});