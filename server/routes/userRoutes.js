const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//사용자 정보 조회
router.get("/", userController.getUserInfo);

module.exports = router;
