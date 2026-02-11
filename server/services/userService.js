const userRepository = require("../repositories/userRepository");

async function getUserPoint(userNo) {
  return await userRepository.findPointByUserNo(userNo);
}

module.exports = { getUserPoint };
