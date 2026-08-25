const path = require("path");
const express = require("express");

const api = require("./routes/api");  // APIオブジェクト作成

const app = express();
const port = 3000;

// 起動時のカレントディレクトリに依存しないよう、絶対パスで静的ファイルを配信する
app.use(express.static(path.join(__dirname, "public")))

app.use("/api", api);  // apiというパスをapiオブジェクトに紐付ける

// "/" は express.static が public/index.html を返すため、疎通確認は /health で行う
app.get("/health", (req, res, next) => {
    res.end("OK");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
