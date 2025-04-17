
# 🌟 Grok レートチェッカー

> 🔎 Grok のクエリ残数をリアルタイムで表示（Default Chat、DeepSearch、DeeperSearch、Think に対応）

---

## 📌 これは何？

**Grok Rate Checker** は、**Grok クエリの残り回数**をリアルタイムで表示する軽量なブラウザ拡張機能です。もう残り回数を推測する必要はありません！

🧠 対応モード：
- **Default Chat**（標準チャット）
- **DeepSearch**
- **DeeperSearch**
- **Think**（推論モード）

残数と上限がスタイリッシュな浮動UIで表示され、自由にドラッグできます。

---

## ✨ 特徴

- ✅ Grok クエリ残数をリアルタイム表示
- 🎨 アニメーション付きの美しい浮動 UI
- 🧲 完全にドラッグ可能
- ⚡ 5 秒ごとに自動更新
- 🧠 [grok.com](https://grok.com) 上でそのまま使える
- 🌍 **Chrome、Edge、Brave** などの Chromium ベースのブラウザに対応

---

## 📸 スクリーンショット

![Grok Rate Checker screenshot](../screenshot.png)

---

## 🛠 インストール手順

1. このリポジトリをクローンまたはダウンロード
2. `chrome://extensions/` にアクセス
3. **デベロッパーモード** を有効化
4. **「パッケージ化されていない拡張機能を読み込む」** をクリック
5. このプロジェクトのフォルダを選択
6. [https://grok.com](https://grok.com) を開くだけで使用可能 🎉

---

## 🧩 ファイル

- `manifest.json` – 拡張機能の設定とパーミッション
- `content.js` – クエリ残数を取得して表示するスクリプト

---

## 📤 使用 API

以下のエンドポイントを使用：

```
POST https://grok.com/rest/rate-limits
```

**リクエスト例：**
```json
{
  "requestKind": "DEFAULT",
  "modelName": "grok-3"
}
```

**レスポンス例：**
```json
{
  "remainingQueries": 42,
  "totalQueries": 50
}
```

---

## 🔐 パーミッション

- `"activeTab"`
- `"storage"`
- `"host_permissions": ["https://grok.com/*"]`

データはローカルにのみ保持され、外部に送信されることはありません。

---

## 👨‍💻 作者
Joshua Wang により開発

Grok を頻繁に使う開発者、研究者、アナリスト、または AI ヘビーユーザーのために設計されました。透明性とスムーズな UX を重視して作られています。🧠✨

## 📜 ライセンス
MIT ライセンスのもとで公開されています。詳細は [LICENSE](./LICENSE) をご覧ください。

## 📬 お問い合わせ
ご意見・ご提案があれば：  
[issue を作成](https://github.com/JoshuaWang2211/grok-rate-checker/issues)  
または X（旧 Twitter）でご連絡ください: [@JoshuaWang2211](https://x.com/JoshuaWang2211)
