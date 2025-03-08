const gridSize = 4;

function createGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        var sect = document.createElement("section");
        sect.className = `section section-${i}`; 
        document.getElementById("container").appendChild(sect);

        for (let j = 0; j < gridSize; j++) {
            var div = document.createElement("div");

            div.className = `square square-${j}`; 

            div.style.margin = "0";
            div.style.padding = "0";
            div.style.border = "1px solid black"; 
            div.style.flex = "1";

            div.style.backgroundColor = "white";

            div.addEventListener("mouseover", function() {
                this.style.backgroundColor = "whitesmoke";
            });
            div.addEventListener("mouseout", function() {
                this.style.backgroundColor = "white";
            });

            div.addEventListener("mousedown", function() {
                this.style.backgroundColor = "black"; 
            });

            sect.appendChild(div);
        }
    }
    const numOfTargets = Math.floor((gridSize * gridSize) / 4 - 0.01);
    for (let i = 0; i < numOfTargets; i++) {
        targetSquare(gridSize);
    }
}

function targetSquare(gridSize) {
    let square;
    do {
        let randomRow = Math.floor(Math.random() * gridSize);
        let randomSquare = Math.floor(Math.random() * gridSize);
        square = document.querySelector(`.section-${randomRow} .square-${randomSquare}`);
    } while (square && square.classList.contains("target"));


    square.style.backgroundColor = "orange";
    square.classList.add("target");

    square.addEventListener("mouseover", function() {
        this.style.backgroundColor = "#FFD580";
    });
    square.addEventListener("mouseout", function() {
        this.style.backgroundColor = "orange";
    });

    square.addEventListener("mousedown", function() {
        this.style.backgroundColor = "white"; 
        this.replaceWith(this.cloneNode(true)); //godsend
        targetSquare(gridSize);
    });
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
    createGrid(gridSize)
}

createGrid(gridSize)

const resetButton = document.querySelector("#clear-button");
resetButton.onmousedown = clearGrid;

document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "r") { // Checks if the 'R' key is pressed
        clearGrid();
    }
});