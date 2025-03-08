let gridSize = 4;
let score = 0;
let timer = 15;
let timerInterval;
let gameActive = false;
let gameInitialized = false;

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

    div.addEventListener("mouseover", () => {
        if (gameActive) div.style.backgroundColor = "whitesmoke";
    });
    div.addEventListener("mouseout", () => {
        if (gameActive && !div.classList.contains("target")) div.style.backgroundColor = "white";
    });
    div.addEventListener("mousedown", () => {
        if (!gameInitialized) {
            startTimer();
            gameInitialized = true;
        }
        
        if (gameActive && !div.classList.contains("target")) {
            div.style.backgroundColor = "red";
            setTimeout(() => {
                if (!div.classList.contains("target")) div.style.backgroundColor = "white";
            }, 200);
            updateScore(-1);
        }
    });

    return div;
}

function targetMouseOver() {
    if (gameActive) this.style.backgroundColor = "#FFD580";
}

function targetMouseOut() {
    if (gameActive) this.style.backgroundColor = "orange";
}

function makeTargetSquare(square) {
    square.classList.add("target");
    square.style.backgroundColor = "orange";

    square.addEventListener("mouseover", targetMouseOver);
    square.addEventListener("mouseout", targetMouseOut);

    const mouseDownHandler = function() {
        if (!gameInitialized) {
            startTimer();
            gameInitialized = true;
        }
        
        if (gameActive) {
            this.style.backgroundColor = "green";
            setTimeout(() => {
                this.style.backgroundColor = "white";
                this.classList.remove("target");
            }, 200);
            this.removeEventListener("mouseover", targetMouseOver);
            this.removeEventListener("mouseout", targetMouseOut);
            this.removeEventListener("mousedown", mouseDownHandler);
            updateScore(1);
            targetSquare();
        }
    };

    square.addEventListener("mousedown", mouseDownHandler);
}

function updateScore(points) {
    score += points;
    document.getElementById("score").textContent = score;
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
    container.innerHTML = '';
    
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

function startTimer() {
    gameActive = true;
    timer = 15;
    document.getElementById("timer").textContent = timer;
    
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer;
        
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function showGameOverPopup() {
    document.getElementById("final-score").textContent = score;
    document.getElementById("game-over").classList.remove("hidden");
}

function hideGameOverPopup() {
    document.getElementById("game-over").classList.add("hidden");
}

function showHowToPlayPopup() {
    document.getElementById("how-to-play").classList.remove("hidden");
}

function hideHowToPlayPopup() {
    document.getElementById("how-to-play").classList.add("hidden");
}

function endGame() {
    clearInterval(timerInterval);
    gameActive = false;
    showGameOverPopup();
}

function resetGame() {
    clearInterval(timerInterval);
    
    score = 0;
    document.getElementById("score").textContent = score;
    timer = 15;
    document.getElementById("timer").textContent = timer;
    
    hideGameOverPopup();
    createGrid();
    gameActive = false;
    gameInitialized = false;
}

function updateGridSize(size) {
    gridSize = size;
    document.getElementById("size-value").textContent = size;
    resetGame();
}

function initGame() {
    createGrid();
    
    document.querySelector("#reset-button").addEventListener('click', resetGame);
    document.querySelector("#close-popup").addEventListener('click', resetGame);
    document.querySelector("#close-instructions").addEventListener('click', hideHowToPlayPopup);
    
    const sizeSlider = document.querySelector("#size-slider");
    sizeSlider.addEventListener('input', () => {
        updateGridSize(parseInt(sizeSlider.value));
    });
    
    document.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() === "r") resetGame();
    });
    
    document.getElementById("timer").textContent = timer;
    gameInitialized = false;
    
    showHowToPlayPopup();
}

document.addEventListener('DOMContentLoaded', initGame);