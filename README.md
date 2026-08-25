# verify_cyber_security

サイバーセキュリティの攻撃手法や対策を試すリポジトリ。

Express で立てたローカルサーバーに対して、レスポンスヘッダやクロスオリジンの挙動を実際に動かしながら確認するための学習用プロジェクトです。

> [!WARNING]
> 攻撃手法の検証コード（`public/attacker.html` など）を含みます。ローカル環境での学習目的のみに使用してください。

## 必要環境

- Node.js 21（Docker を使う場合は Docker / Docker Compose のみ）

## セットアップ

### ローカルで起動

```bash
npm install
npm start
```

### Docker Compose で起動

```bash
docker compose up --build
```

いずれの場合も http://localhost:3000 で起動します。

## エンドポイント

| メソッド | パス | 説明 |
| --- | --- | --- |
| GET | `/` | `public/index.html` を返す（`express.static` による静的配信） |
| GET | `/health` | 疎通確認用。`OK` を返す |
| GET | `/api?message=<文字列>` | `{ "message": "<文字列>" }` を返す。レスポンスに `X-Timestamp-2` ヘッダを付与 |
| POST | `/api` | JSON ボディを受け取る。開発時のみボディのキー名をログ出力 |

### GET /api の挙動

`message` が未指定・空文字・空白のみの場合は 400 を返します。リクエストヘッダ `X-Lang: en` を付けるとエラーメッセージが英語になります。

```bash
# 200
curl -i "http://localhost:3000/api?message=hello"

# 400 {"message":"messageが空です。"}
curl -i "http://localhost:3000/api"

# 400 {"message":"message is empty."}
curl -i -H "X-Lang: en" "http://localhost:3000/api"
```

### POST /api のログ出力

リクエストボディには機微な情報が含まれ得るため、`NODE_ENV=production` ではログを出力しません。開発時もボディ全体ではなくキー名のみを出力します。

## 検証用ページ

| ファイル | 内容 |
| --- | --- |
| `public/index.html` | トップページ |
| `public/user.html` | ログインユーザー情報を表示するページ（攻撃対象側の想定） |
| `public/attacker.html` | 罠ページ。`user.html` を iframe で埋め込み、そのDOMからユーザー情報を読み取ろうとする |

`attacker.html` はクロスオリジンで別ドメインのページを読み取れないこと（同一オリジンポリシー）を確認するためのものです。異なるオリジンとして扱わせるため、hosts ファイルに以下を追加してから `http://attacker.example:3000/attacker.html` にアクセスし、DevTools のコンソールを確認してください。

```
127.0.0.1 site.example
127.0.0.1 attacker.example
```

## メモ

学習内容のメモは [`routes/メモ.md`](routes/メモ.md) にまとめています。
