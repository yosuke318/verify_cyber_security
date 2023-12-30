const express = require("express");
const router = express.Router();  // ルーティング用オブジェクト

router.get("/", (req, res) => {
    res.setHeader("X-Timestamp-2", Date.now());  // X-Timestampというヘッダをレスポンスに追加する。
 
    let message = req.query.message;

    const lang = req.headers["x-lang"];
    if (message === ""){
        res.status(400);  // messageが空の場合、400エラー
        if(lang ==="en"){
            message = "message is empty.";
        }else {
            message = "messageが空です。";
        }
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