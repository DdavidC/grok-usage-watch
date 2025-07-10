# 🌟 Grok Rate Checker v1.4

> 🔎 即時顯示 Grok 剩餘對話次數（支援 Grok 3 與 Grok 4）

---

## 📌 功能介紹

**Grok Rate Checker** 是一個輕量級瀏覽器擴充功能，可即時顯示你在 Grok 剩餘對話次數。

🧠 支援查詢類型：

* **Grok 3**

  * 一般對話（Default）
  * 深度搜尋（DeepSearch）
  * 更深度搜尋（DeeperSearch）
  * 思考模式（Think）
* **Grok 4**

  * 一般對話（Default）
  * 深度思考 (Heavy)

提供可拖曳、簡潔優雅的浮動 UI 顯示剩餘次數。

---

## ✨ 功能特色

* ✅ 即時查看 Grok 剩餘對話次數（支援 Grok 3 + Grok 4）
* 🎨 有風格且動畫平滑的浮動介面
* 🧲 完全可拖曳的位置設計
* ⚡ 每 5 秒自動更新一次
* 🧠 安裝後可立即在 [grok.com](https://grok.com) 運作，無需設定
* 🌍 相容於 **Chrome、Edge、Brave** 等 Chromium 核心瀏覽器

---

## 📸 截圖預覽

![Grok Rate Checker screenshot](screenshot.png)

---

## 🛠 安裝方式

1. 下載或 clone 此專案
2. 開啟瀏覽器輸入 `chrome://extensions/`
3. 開啟右上角的 **開發人員模式**
4. 點選 **「載入未封裝項目」**
5. 選擇此專案資料夾
6. 前往 [https://grok.com](https://grok.com) 開始使用 🎉

---

## 🧩 專案檔案說明

* `manifest.json`：擴充功能設定與權限定義
* `content.js`：注入頁面的腳本，負責即時抓取並顯示剩餘對話次數

---

## 📤 使用 API

此擴充功能會對以下 API 發出請求：

```
POST https://grok.com/rest/rate-limits
```

**範例請求內容：**

```json
{
  "requestKind": "DEFAULT",
  "modelName": "grok-3"
}
```

**範例回應：**

```json
{
  "remainingQueries": 42,
  "totalQueries": 50
}
```

Grok 4 查詢格式類似，只需將 `modelName` 改為 `grok-4`，`requestKind` 可為 `HEAVY` 或 `DEFAULT`。

---

## 🔐 權限需求

* `"activeTab"`
* `"storage"`
* `"host_permissions": ["https://grok.com/*"]`

所有資料皆僅儲存在本地瀏覽器，不會上傳或分享。

---

## 👨‍💻 作者資訊

作者：Joshua Wang

專為 Grok 重度使用者設計 — 無論你是開發者、研究員、資料分析師，還是每天瘋狂使用 Grok 的人。這個工具追求透明、流暢與極致 UX 🧠✨

## 📜 授權條款

本專案採用 MIT 授權，詳見 [LICENSE](./LICENSE)

## 📬 聯絡方式

有建議或想法嗎？
歡迎 [提交 issue](https://github.com/JoshuaWang2211/grok-rate-checker/issues)
