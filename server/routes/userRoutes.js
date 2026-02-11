const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:userNo/point", userController.getUserPoint);

module.exports = router;
