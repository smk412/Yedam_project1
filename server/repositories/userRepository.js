const db = require("../db");

async function findUserInfo(userNo) {
  let conn;

  try {
    conn = await db.getConnection();

    const result = await conn.execute(
      `SELECT user_no, user_id, role, point, created_at
       FROM users 
       WHERE user_no = :userNo`,
      { userNo },
    );

    return result.rows[0];
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = { findUserInfo };
