const oracledb = require("oracledb");

//결과물 -> 객체로
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getConnection() {
  return await oracledb.getConnection({
    user: "project1",
    password: "tiger",
    connectString: "192.168.0.27:1521/xe",
  }); // 세션
}

module.exports = { getConnection, oracledb };
