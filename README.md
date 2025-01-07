# Tic-Tac-Toe Game
---

## Table of Contents
- [Features](#features)
- [How to Set Up and Run the Program](#how-to-set-up-and-run-the-program)
- [Program Design](#program-design)
- [Algorithm Used](#algorithm-used)

---

## Features
- Create a customizable game grid (any size from 3x3 and above).
- Players can take turns playing "X" and "O".
- Detects win or draw conditions.
- Auto-saves the game state when the game ends.
- Simple, clean, and intuitive UI for easy play.

---

## How to Set Up and Run the Program

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/HeisenBerg0079/Tic-Tac-Toe.git

2. **Navigate to the Project Folder:**

   ```bash
   cd Tic-Tac-Toe

3. **Install Dependencies:**

   ```bash
   npm init -y

4. **Run project and Run the Program:**

   ```bash
   node server.js
   
---

## Program Design
1.HTML:
  - The main HTML file (index.html) sets up the structure for the grid, buttons, and status messages.
2.CSS:
  - The style.css file provides basic styles for the grid layout, status display, and buttons.
3.JavaScript:
  - The core logic is implemented in index.js.
  - The game board is dynamically created based on user input (rows and columns).
  - The game checks for winning or draw conditions after each move.
  - A simple algorithm handles player turns and checks for victory.

---

## Algorithm Used
1.Game Initialization:
  - The game grid size (rows x columns) is set based on user input.
  - The game begins with player "X" and alternates between "X" and "O" after each valid move.
2.Player Moves:
  - Players click on the cells of the grid to make their move. If a cell is empty, it is filled with the current player's symbol ("X" or "O").
  - After each move, the game checks for any winning condition (three consecutive marks in a row, column, or diagonal).
3.Winning Conditions:
  - Horizontal Check: For each row, check if there are 3 consecutive cells marked by the current player.
  - Vertical Check: For each column, check if there are 3 consecutive cells marked by the current player.
  - Diagonal Check: Check both diagonals (top-left to bottom-right and top-right to bottom-left) for a winning line.
4.Draw Check:
  - If all cells are filled and no winner is found, the game is considered a draw.
5.Auto-Save:
  - Once the game ends, whether by a win or a draw, the game state is saved automatically. This includes moves, winner, and the date the game was played.
  - The game data is then sent to the server via a POST request for persistence.
6.Game Restart:
  - Players can reset the game to start a new round by clearing the grid and initializing a new game state.
