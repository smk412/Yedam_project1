const userService = require("../services/userService");

async function getUserPoint(req, res) {
  const userNo = req.params.userNo;
  const point = await userService.getUserPoint(userNo);
  res.json(point);
}

module.exports = { getUserPoint };
