const express = require("express");
const { getConnection, oracledb } = require("./db");
const app = express();
const cors = require("cors");

// app 셋업추가 (+ CORS)
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");

app.use("/users", userRoutes);
app.use("/games", gameRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
