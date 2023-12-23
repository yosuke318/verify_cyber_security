const express=require("express");

const api = require("./routes/api");  // APIオブジェクト作成

const app = express();
const port = 3000;

app.use(express.static("public"))

app.use("/api", api);  // apiというパスをapiオブジェクトに紐付ける

app.get("/", (req, res, next)=>{
    res.end("Top Page");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});