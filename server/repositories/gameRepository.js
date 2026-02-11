const db = require("../db");

// 게임 목록 조회
async function findAllGames() {
  const conn = await db.getConnection();

  const result = await conn.execute(
    "SELECT game_no, game_name, base_rate FROM games WHERE is_active = 1",
  );

  await conn.close();
  return result.rows;
}

// 게임 추가
async function insertGame(data) {
  const conn = await db.getConnection();

  const result = await conn.execute(
    `INSERT INTO games
    (gameName, description, baseRate, isActive)
    VALUES (games_seq.NEXTVAL, : :gameName, :description, :baseRate, :isActive)`,
    {
      gameName: data.gameName,
      description: data.description,
      baseRate: data.baseRate,
      isActive: data.isActive,
    },
    { autoCommit: true },
  );

  await conn.close();
}

module.exports = { findAllGames, insertGame };
