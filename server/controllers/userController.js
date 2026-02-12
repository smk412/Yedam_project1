const userService = require("../services/userService");

async function getUserInfo(req, res) {
  try {
    const userNo = req.user.userNo;

    // 응답 형태 재정의
    const user = await userService.getUserInfo(userNo);

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "유저 조회 실패" });
  }
}

module.exports = { getUserInfo };
