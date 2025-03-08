const gridSize = 4;

function createBaseSquare() {
    const div = document.createElement("div");
    div.className = "square";
    
    Object.assign(div.style, {
        margin: "0",
        padding: "0",
        border: "1px solid black",
        flex: "1",
        backgroundColor: "white"
    });

    div.addEventListener("mouseover", () => div.style.backgroundColor = "whitesmoke");
    div.addEventListener("mouseout", () => div.style.backgroundColor = "white");
    div.addEventListener("mousedown", () => div.style.backgroundColor = "black");

    return div;
}

function targetMouseOver() {
    this.style.backgroundColor = "#FFD580";
}

function targetMouseOut() {
    this.style.backgroundColor = "orange";
}

function makeTargetSquare(square) {
    square.classList.add("target");
    square.style.backgroundColor = "orange";

    square.addEventListener("mouseover", targetMouseOver);
    square.addEventListener("mouseout", targetMouseOut);

    const mouseDownHandler = function() {
        this.style.backgroundColor = "white";
        this.classList.remove("target");
        this.removeEventListener("mouseover", targetMouseOver);
        this.removeEventListener("mouseout", targetMouseOut);
        this.removeEventListener("mousedown", mouseDownHandler);
        targetSquare();
    };

    square.addEventListener("mousedown", mouseDownHandler);
}

function getRandomSquare() {
    const randomRow = Math.floor(Math.random() * gridSize);
    const randomSquare = Math.floor(Math.random() * gridSize);
    return document.querySelector(`.section-${randomRow} .square-${randomSquare}`);
}

function targetSquare() {
    let square;
    do {
        square = getRandomSquare();
    } while (square && square.classList.contains("target"));

    makeTargetSquare(square);
}

function createGrid() {
    const container = document.getElementById("container");
    
    for (let i = 0; i < gridSize; i++) {
        const section = document.createElement("section");
        section.className = `section section-${i}`;
        container.appendChild(section);

        for (let j = 0; j < gridSize; j++) {
            const div = createBaseSquare();
            div.classList.add(`square-${j}`);
            section.appendChild(div);
        }
    }
    
    const numOfTargets = Math.floor((gridSize * gridSize) / 4 - 0.01);
    for (let i = 0; i < numOfTargets; i++) {
        targetSquare();
    }
}

function clearGrid() {
    document.getElementById("container").innerHTML = '';
    createGrid();
}

function initGame() {
    createGrid();
    
    document.querySelector("#clear-button").addEventListener('click', clearGrid);
    document.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() === "r") clearGrid();
    });
}

document.addEventListener('DOMContentLoaded', initGame);