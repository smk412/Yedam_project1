const gameRepository = require("../repositories/gameRepository");

async function getGames() {
  return await gameRepository.findAllGames();
}

async function createGame() {
  return await gameRepository.insertGame(data);
}

module.exports = {
  getGames,
  createGame,
};
