const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connection = require("./db");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

// POST endpoint to save the game
app.post("/save-game", (req, res) => {
  const gameData = req.body; // Get the game data from the request body

  // Extract grid size and construct it as a string, e.g., "3x3"
  const gridSize = `${gameData.gridSize.rows}x${gameData.gridSize.cols}`;

  // SQL query to insert a new game record into the database
  const query = `INSERT INTO game_history (game_id, grid_size, moves, winner, date)
                   VALUES (?, ?, ?, ?, ?)`;

  // JSON encode the moves array before storing
  const moves = JSON.stringify(gameData.moves);

  // Insert game data into the MySQL database
  connection.query(query, [gameData.gameId, gridSize, moves, gameData.winner, gameData.date], (err, result) => {
    if (err) {
      console.error("Error saving game to database:", err);
      return res.status(500).json({ error: "Failed to save game history" });
    }
    res.json({ message: "Game saved successfully!" });
  });
});

// GET endpoint to fetch all saved game history
app.get("/game-history", (req, res) => {
  connection.query("SELECT * FROM game_history", (err, rows) => {
    if (err) {
      console.error("Error fetching game history:", err);
      return res.status(500).json({ error: "Failed to fetch game history" });
    }

    // Parse the moves JSON string back into an array
    const formattedRows = rows.map((row) => {
      return {
        game_id: row.game_id,
        grid_size: row.grid_size,
        moves: JSON.parse(row.moves),
        winner: row.winner,
        date: row.date,
      };
    });

    res.json(formattedRows); // Send the formatted data back to the client
  });
});

// Add a route for the root URL to return the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
