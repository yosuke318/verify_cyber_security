const express = require("express");
const router = express.Router();  // ルーティング用オブジェクト

router.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

module.exports = router;  // 他のファイルから読み取れるようにする