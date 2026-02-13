const gameService = require("../services/gameService");

// 게임 목록 조회
async function getGames(req, res) {
  try {
    const games = await gameService.getGames();

    // 응답 형태 재정의 (DB 구조와 분리)
    const response = games.map((game) => ({
      gameNo: game.GAME_NO,
      gameName: game.GAME_NAME,
      baseRate: game.BASE_RATE,
      isActive: game.IS_ACTIVE,
      createdAt: game.CREATED_AT,
    }));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "게임 목록 조회 실패" });
  }
}

// 게임 추가
async function createGame(req, res) {
  try {
    const { gameName, description, baseRate, isActive } = req.body;

    // 기본 형식 검증 (Controller 책임)
    if (!gameName || !baseRate) {
      return res.status(400).json({
        message: "필수 값 누락 : not null 충족 실패",
      });
    }

    const createdGame = await gameService.createGame({
      gameName,
      description,
      baseRate,
      isActive,
    });

    res.status(201).json({
      message: "게임 추가 완료",
      gameNo: createdGame.gameNo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "게임 추가 실패" });
  }
}

// 게임 참여
async function playGame(req, res) {
  const userNo = req.user.userNo;
  const { betAmount, choice } = req.body;

  if (!betAmount || !choice) {
    return res.status(400).json({
      message: "잘못된 요청입니다.",
    });
  }

  try {
    const result = await gameService.playDiceGame(userNo, betAmount, choice);

    return res.json(result);
  } catch (err) {
    if (err.message === "INSUFFICIENT_POINT") {
      return res.status(400).json({
        message: "포인트 부족",
      });
    }

    console.error(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}

module.exports = {
  getGames,
  createGame,
  playGame,
};
