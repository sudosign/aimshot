const gridSize = 4;

function createBaseSquare() {
    const div = document.createElement("div");

    div.className = `square`; 

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

    return div;
}

function makeTargetSquare(square, gridSize) {
    square.classList.add("target");
    square.style.backgroundColor = "orange";

    square.addEventListener("mouseover", targetMouseOver);
    square.addEventListener("mouseout", targetMouseOut);

    square.addEventListener("mousedown", function() {
        this.style.backgroundColor = "white";
        this.classList.remove("target");
        this.removeEventListener("mouseover", targetMouseOver);
        this.removeEventListener("mouseout", targetMouseOut);
        this.removeEventListener("mousedown", arguments.callee); //change
        targetSquare(gridSize);
    });
}

function targetMouseOver() {
    this.style.backgroundColor = "#FFD580";
}

function targetMouseOut() {
    this.style.backgroundColor = "orange";
}

function targetSquare(gridSize) {
    let square;
    do {
        let randomRow = Math.floor(Math.random() * gridSize);
        let randomSquare = Math.floor(Math.random() * gridSize);
        square = document.querySelector(`.section-${randomRow} .square-${randomSquare}`);
    } while (square && square.classList.contains("target"));

    makeTargetSquare(square, gridSize);
}

function createGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        var sect = document.createElement("section");
        sect.className = `section section-${i}`;
        document.getElementById("container").appendChild(sect);

        for (let j = 0; j < gridSize; j++) {
            const div = createBaseSquare();
            div.classList.add(`square-${j}`);
            sect.appendChild(div);
        }
    }
    const numOfTargets = Math.floor((gridSize * gridSize) / 4 - 0.01);
    for (let i = 0; i < numOfTargets; i++) {
        targetSquare(gridSize);
    }
}

function clearGrid() {
    while (document.getElementById("container").firstChild) {
        document.getElementById("container").removeChild(document.getElementById("container").lastChild);
    }
    createGrid(gridSize);
}

createGrid(gridSize);

const resetButton = document.querySelector("#clear-button");
resetButton.onmousedown = clearGrid;

document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === "r") { 
        clearGrid();
    }
});