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

// 게임 참여 (트랜잭션 전용)
async function playDiceGame(userNo, betAmount, choice) {
  const conn = await db.getConnection();

  try {
    const gameNo = 1;

    // 현재 포인트 조회
    const userResult = await conn.execute(
      `SELECT point FROM users WHERE user_no = :userNo`,
      { userNo },
    );

    const currentPoint = userResult.rows[0].POINT;

    if (betAmount > currentPoint) {
      throw new Error("INSUFFICIENT_POINT");
    }

    // 배당률 조회
    const gameResult = await conn.execute(
      `SELECT base_rate FROM games WHERE game_no = :gameNo`,
      { gameNo },
    );

    const odds = gameResult.rows[0].BASE_RATE;

    // 주사위 생성
    const dice = Math.floor(Math.random() * 6) + 1;

    const isOdd = dice % 2 === 1;
    const isWin = (isOdd && choice === "odd") || (!isOdd && choice === "even");

    const result = isWin ? 1 : 0;
    const payout = isWin ? Math.floor(betAmount * odds) : 0;

    // 최종 포인트 계산
    let updatedPoint;

    if (isWin) {
      updatedPoint = currentPoint - betAmount + payout;
    } else {
      updatedPoint = currentPoint - betAmount;
    }

    // bet_no 생성
    const betNoResult = await conn.execute(
      `SELECT NVL(MAX(bet_no), 0) + 1 AS NEXT_BET_NO FROM game_bets`,
    );

    const betNo = betNoResult.rows[0].NEXT_BET_NO;

    // game_bets INSERT
    await conn.execute(
      `INSERT INTO game_bets
      (bet_no, user_no, game_no, bet_point, odds, result, payout)
      VALUES
      (:betNo, :userNo, :gameNo, :betPoint, :odds, :result, :payout)`,
      {
        betNo,
        userNo,
        gameNo,
        betPoint: betAmount,
        odds,
        result,
        payout,
      },
    );

    // users.point UPDATE
    await conn.execute(
      `UPDATE users
      SET point = :updatedPoint
      WHERE user_no = :userNo`,
      {
        updatedPoint,
        userNo,
      },
    );

    await conn.commit();

    return {
      dice,
      result,
      payout,
      odds,
      currentPoint: updatedPoint,
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    await conn.close();
  }
}

module.exports = { findAllGames, insertGame, playDiceGame };
