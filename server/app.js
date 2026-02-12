const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// app 셋업추가 (+ CORS)
app.use(cors());
app.use(express.json());

// 공통 자산(css, js) 절대경로
app.use(express.static(path.join(__dirname, "../public")));

// 사용자 페이지 절대경로
app.use(express.static(path.join(__dirname, "../client")));

// 관리자 페이지 절대경로
app.use(express.static(path.join(__dirname, "../admin")));

//테스트용 강제 로그인
app.use((req, res, next) => {
  req.user = { userNo: 1 };
  next();
});

const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");

app.use("/users", userRoutes);
app.use("/games", gameRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
