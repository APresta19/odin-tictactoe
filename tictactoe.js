const messageDisplay = document.querySelector("#message-display");
const restartGame = document.querySelector("button");
let endGame = false;

const gameboard = (function() {
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;
    let clickCount = 0;
    let wonGame = false;

    const player1 = (function()
    {
        const choice = "X";
        const num = 1;
        return {choice, num};
    })();
    const player2 = (function()
    {
        const choice = "O";
        const num = 2;
        return {choice, num};
    })();

    let playerTurn = player1;
    const setPlayerTurn = (player) =>
    {
        playerTurn = player;
    };
    const getPlayerTurn = () => playerTurn;
    const getClickCount = () => clickCount;
    const getWonGame = () => wonGame;
    const switchPlayerTurn = () =>
    {
        if(playerTurn == player1)
        {
            playerTurn = player2;
        }
        else
        {
            playerTurn = player1;
        }
        messageDisplay.textContent = "Player " + playerTurn.num + "'s Turn.";
    }
    const increaseClickCount = () =>
    {
        clickCount++;
    }
    const setClickCount = (num) =>
    {
        clickCount = num;
    }
    const setWonGame = (won) =>
    {
        wonGame = won;
    }
    messageDisplay.textContent = "Player " + playerTurn.num + "'s Turn.";
    return {playerTurn, getPlayer1, getPlayer2, setPlayerTurn, getPlayerTurn, switchPlayerTurn, clickCount, increaseClickCount, wonGame, getClickCount, getWonGame, setClickCount, setWonGame};
})();
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) =>
{
    cell.addEventListener("click", () =>
    {
        simulateGame(cells, cell);
    });
    restartGame.addEventListener("click", () =>
    {
        cell.textContent = "";
        //reset message label
        gameboard.setPlayerTurn(gameboard.getPlayer1());
        messageDisplay.textContent = "Player " + gameboard.getPlayerTurn().num + "'s Turn.";
        gameboard.setClickCount(0);
        endGame = false;
        gameboard.setWonGame(false);
    });
});

function simulateGame(cells, cell)
{
    if(cell.textContent == "" && !endGame)
    {
        cell.textContent = gameboard.getPlayerTurn().choice;
        gameboard.increaseClickCount();
        gameboard.switchPlayerTurn();
        wonGame(cells);
        console.log(gameboard.getClickCount());
    }
    console.log(gameboard.wonGame)
    if(gameboard.getClickCount() == 9 && !gameboard.getWonGame())
    {
        endGame = true;
        messageDisplay.textContent = "You tied!";
    }
}
function wonGame(cells)
{
    const winCombinations = [[0, 1, 2],
                             [3, 4, 5],
                             [6, 7, 8],
                             [0, 3, 6],
                             [1, 4, 7],
                             [2, 5, 8],
                             [0, 4, 8],
                             [2, 4, 6]];
    for(let i = 0; i < winCombinations.length; i++)
    {
        for(let j = 1; j < winCombinations[i].length; j++)
        {
            if(cells[winCombinations[i][j]].textContent != cells[winCombinations[i][j-1]].textContent && cells[winCombinations[i][j]].textContent != "")
            {
                console.log("Not found in " + winCombinations[i]);
                break;
            }
            if(cells[winCombinations[i][j]].textContent == cells[winCombinations[i][j-1]].textContent && j == 2 && cells[winCombinations[i][j]].textContent != "")
            {
                displayWinMessage(cells[winCombinations[i][j]].textContent);
                gameboard.wonGame = true;
            }
        }
    }
    return {wonGame: gameboard.wonGame};
}
function displayWinMessage(playerText)
{
    if(playerText == gameboard.getPlayer1().choice)
    {
        //player 1 wins
        messageDisplay.textContent = "Player 1 Wins!";
    }
    else
    {
        //player 2 wins
        messageDisplay.textContent = "Player 2 Wins!";
    }
    endGame = true;
}