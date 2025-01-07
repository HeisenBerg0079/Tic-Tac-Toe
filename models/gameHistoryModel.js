// models/GameHistoryModel.js
class GameHistoryModel {
  constructor(gameId, gridSize, moves, winner, date) {
      this.gameId = gameId;
      this.gridSize = gridSize; // { rows: Number, cols: Number }
      this.moves = moves; // [{ player: 'X' | 'O', position: { row: Number, col: Number }}]
      this.winner = winner; // 'X' | 'O' | 'draw'
      this.date = date; // Date of the game
  }

  // Method to save game history to an in-memory store or database
  static save(gameData) {
      // Assuming we are storing in an in-memory array
      gameHistory.push(gameData); // You can replace this with a database save function
  }

  // Optional: Method to fetch all game history
  static getAll() {
      return gameHistory;
  }
}

// In-memory store for game history
let gameHistory = [];

module.exports = GameHistoryModel;