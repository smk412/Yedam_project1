const db = require("../db");

async function findPointByUserNo(userNo) {
  const conn = await db.getConnection();

  const result = await conn.execute(
    "SELECT point FROM users WHERE user_no = :userNo",
    [userNo],
  );

  await conn.close();
  return result.rows[0];
}

module.exports = { findPointByUserNo };
