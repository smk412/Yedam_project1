const gameRepository = require("../repositories/gameRepository");

async function getGames() {
  return await gameRepository.findAllGames();
}

async function createGame() {
  return await gameRepository.insertGame(data);
}

async function playDiceGame(userNo, betAmount, choice) {
  return await gameRepository.playDiceGame(userNo, betAmount, choice);
}

module.exports = {
  getGames,
  createGame,
  playDiceGame,
};
