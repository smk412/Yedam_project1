const userRepository = require("../repositories/userRepository");

async function getUserInfo(userNo) {
  return await userRepository.findUserInfo(userNo);
}

module.exports = { getUserInfo };
