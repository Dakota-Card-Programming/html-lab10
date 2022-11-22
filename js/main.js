//each item can be either null, 0 (player1), 1 (player2)
const boardState = [
    null, null, null,
    null, null, null,
    null, null, null
];

//the win condition array
const winConditions = [
    //win conditions for rows
    //index 0 in winConditions array
    [0, 1, 2],
    //index 1 in winConditions array
    [3, 4, 5],
    //index 2 in winConditions array
    [6, 7, 8],

    //win conditions for columns
    //index 3 in winConditions array
    [0, 3, 6],
    //index 4 in winConditions array
    [1, 4, 7],
    //index 5 in winConditions array
    [2, 5, 8],

    //win conditions for diagonal
    //index 6 of winConditions array
    [0, 4, 8],
    //index 7 of winConditions array
    [6, 4, 2]
];

//the active player
//using let because we want it to be mutable
let activePlayer = 0;

//cells
const cells = document.querySelectorAll("td");

//add event listeners to the cells
cells.forEach(function (cell, index) {
    //
    cell.dataset.index = index;

    //adds color on mouseover
    cell.onmouseover = function () {
        cell.style.backgroundColor = "#ccc";
        cell.style.transition = "1s";
    }

    //takes the color away when the mouse goes away
    cell.onmouseout = function() {
        cell.style.backgroundColor = "#fff";
    }

    //
    cell.addEventListener("click", clicked);
});

//function that changes the cells when clicked on 
function clicked (event){
    //casts the index to a number rather than a string
    const index = Number(event.target.dataset.index);

    //
    const letter = activePlayer ? "O" : "X";

    //changes the cell value to display the value of letter
    const cell = event.target;
    cell.textContent = letter;

    //changing the null values in boardState to activePlayer value
    boardState[index] = activePlayer;

    //doesnt allow the player to click again on the same cell
    cell.removeEventListener("click", clicked);

    //removes background hover effect
    cell.onmouseover = null;

    if(hasWon()){
        window.location = "../winner.html"
    }

    if(hasDrawn()){
        window.location = "../draw.html"
    }
    //allows us to toggle between the 2 players
    activePlayer = activePlayer ? 0 : 1;
};

//the win detector
function hasWon(){
    //goes over all the winConditions 
    for(const condition of winConditions){
        const boardValues = condition.map(function (item) {
            return boardState[item];
        });

        //
        const playerPieces = boardValues.filter(function (item) {
            return item === activePlayer;
        });

        //
        if(playerPieces.length === 3) return true;
    }

    return false;
}

//the draw detector
function hasDrawn(){
    const boardCapacity = boardState.filter(function(item){
        return item !== null;
    });

    return boardCapacity.length === boardState.length;
}

const again = document.querySelector("#again");
if(again){
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./";
    }
}