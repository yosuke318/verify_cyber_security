const express = require("express");
const router = express.Router();  // ルーティング用オブジェクト

router.get("/", (req, res) => {
    res.setHeader("X-Timestamp-2", Date.now());  // X-Timestamp-2というヘッダをレスポンスに追加する。

    const lang = req.headers["x-lang"];

    // クエリが未指定・配列・空白のみの場合も「空」として扱う
    const raw = req.query.message;
    const message = typeof raw === "string" ? raw.trim() : "";

    if (message === "") {
        // messageが空の場合、400エラー
        return res.status(400).send({
            message: lang === "en" ? "message is empty." : "messageが空です。",
        });
    }

    res.send({ message });
});

router.use(express.json());
router.post("/", (req, res)=>{
    const body = req.body;  // リクエストボディを受け取る設定
    // リクエストボディには機微な情報が含まれ得るため、本番環境ではログに出さない
    if (process.env.NODE_ENV !== "production") {
        console.log("POST /api received body with keys:", Object.keys(body ?? {}));
    }
    res.end();
});

module.exports = router;  // 他のファイルから読み取れるようにする
