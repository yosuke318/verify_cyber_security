const express = require("express");
const router = express.Router();  // ルーティング用オブジェクト

router.get("/", (req, res) => {
    let message = req.query.message;
    res.send({ message });
});

router.use(express.json());
router.post("/", (req, res)=>{
    const body = req.body;  // リクエストボディを受け取る設定
    console.log(body);
    res.end();
});

module.exports = router;  // 他のファイルから読み取れるようにする