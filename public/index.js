import { v4 as uuidv4 } from "https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js";

document.getElementById("grid-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const gameContainer = document.getElementById("game-container");

  // Clear the container if there was an existing grid
  gameContainer.innerHTML = "";

  // Create the grid based on rows and columns input
  let gameState = Array(rows * cols).fill(""); // Initialize game state based on grid size
  let gameActive = true;
  let currentPlayer = "X";

  // Display the status
  const statusDisplay = document.querySelector(".game--status");
  const winningMessage = () => `Player ${currentPlayer} has won!`;
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
  statusDisplay.innerHTML = currentPlayerTurn();

  // Dynamically generate the grid
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList.add("game-row");
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      const index = i * cols + j;
      cell.setAttribute("data-cell-index", index);
      cell.addEventListener("click", handleCellClick);
      row.appendChild(cell);
    }
    gameContainer.appendChild(row);
  }

  // Handle cell clicks
  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }

  function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
  }

  // Winning conditions based on grid size
  function handleResultValidation() {
    const winLength = 3; // Length required to win
    let roundWon = false;

    // Check horizontal, vertical, and diagonal lines
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Horizontal
        if (j <= cols - winLength) {
          if (gameState[i * cols + j] === currentPlayer && gameState[i * cols + j + 1] === currentPlayer && gameState[i * cols + j + 2] === currentPlayer) {
            roundWon = true;
            break;
          }
        }
        // Vertical
        if (i <= rows - winLength) {
          if (gameState[i * cols + j] === currentPlayer && gameState[(i + 1) * cols + j] === currentPlayer && gameState[(i + 2) * cols + j] === currentPlayer) {
            roundWon = true;
            break;
          }
        }
        // Diagonal (top-left to bottom-right)
        if (i <= rows - winLength && j <= cols - winLength) {
          if (gameState[i * cols + j] === currentPlayer && gameState[(i + 1) * cols + j + 1] === currentPlayer && gameState[(i + 2) * cols + j + 2] === currentPlayer) {
            roundWon = true;
            break;
          }
        }
        // Diagonal (top-right to bottom-left)
        if (i <= rows - winLength && j >= winLength - 1) {
          if (gameState[i * cols + j] === currentPlayer && gameState[(i + 1) * cols + j - 1] === currentPlayer && gameState[(i + 2) * cols + j - 2] === currentPlayer) {
            roundWon = true;
            break;
          }
        }
      }
      if (roundWon) break;
    }

    // Check for a win or draw
    if (roundWon) {
      statusDisplay.innerHTML = winningMessage();
      gameActive = false;
      autoSaveGame(); // Auto-save when game ends
      return;
    }

    // Check for a draw
    if (!gameState.includes("")) {
      statusDisplay.innerHTML = drawMessage();
      gameActive = false;
      autoSaveGame(); // Auto-save when game ends
      return;
    }

    handlePlayerChange();
  }

  // Auto-save the game state when it ends (win or draw)
  function autoSaveGame() {
    const gameData = {
      gameId: uuidv4(), // Use a unique ID for the game, e.g., current timestamp
      gridSize: { rows: rows, cols: cols },
      moves: [], // List of moves made during the game
      winner: currentPlayer === "X" ? "X" : "O", // Winner or "draw"
      date: new Date().toISOString(), // Date the game was played
    };

    // Gather all moves made during the game
    document.querySelectorAll(".cell").forEach((cell, index) => {
      if (gameState[index] !== "") {
        gameData.moves.push({
          player: gameState[index], // 'X' or 'O'
          position: { row: Math.floor(index / cols), col: index % cols }, // Calculate row/col from index
        });
      }
    });

    // Send the game data to the server
    fetch("/save-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData), // Send the game data as a JSON object
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Game saved:", data.message);
      })
      .catch((error) => {
        console.error("Error saving game:", error);
      });
  }

  function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
  }

  function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = Array(rows * cols).fill("");
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  }

  // Add restart event listener
  document.querySelector(".game--restart").addEventListener("click", handleRestartGame);
});
