const express = require("express");
const router = express.Router();  // ルーティング用オブジェクト

router.get("/", (req, res) => {
    res.setHeader("X-TimestamP", Date.now());  // X-Timestampというヘッダをレスポンスに追加する。
 
    let message = req.query.message;
    if (message === ""){
        res.status(400);  // messageが空の場合、400エラー
        message = "messageが空です。";
    }

    res.send({ message });
});

router.use(express.json());
router.post("/", (req, res)=>{
    const body = req.body;  // リクエストボディを受け取る設定
    console.log(body);
    res.end();
});

module.exports = router;  // 他のファイルから読み取れるようにする