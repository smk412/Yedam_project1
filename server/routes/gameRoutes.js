const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// 게임 목록 조회
router.get("/", gameController.getGames);

// 게임 추가
router.post("/", gameController.createGame);

module.exports = router;
