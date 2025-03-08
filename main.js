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

            // div.style.width = "100px";
            // div.style.height = "100px";
            div.style.flex = "1";

            div.addEventListener("mouseover", function() {
                this.style.backgroundColor = "black"; 
            });

            // div.onmouseout = function(){
            //     this.style.backgroundColor = "lightgrey";
            // }

            sect.appendChild(div);
        }
    }
}

createGrid(prompt("How many squares per side: "));

const resetButton = document.querySelector("#clear-button")
resetButton.onmousedown = function(){
//https://github.com/Danjor225/odin-etchsketch/blob/main/java-script.js

    let gridSize;
    do{
        gridSize = prompt("Please enter the new size of the grid:");
    }while(gridSize > 100);
    
    while(document.getElementById("container").firstChild){
        document.getElementById("container").removeChild(document.getElementById("container").lastChild)
    }

    createGrid(gridSize);
}