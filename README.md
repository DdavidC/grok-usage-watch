# 🌟 Grok Usage Watch – Rate Limit Tracker

> 🔎 即時顯示 Grok 使用量（支援 Grok 3 與 Grok 4）

---

## 📌 功能介紹

**Grok Usage Watch** 是一款輕量級瀏覽器擴充功能，可即時顯示 Grok 的使用量，以及每次請求的「effort 等級」。

每次對話的「effort 等級」會由 Grok 系統根據 xAI 的內部邏輯自動判斷，代表該請求的任務難度與耗用的 Token 強度，讓你更清楚掌握資源使用狀況。

---

## ✨ 功能特色

* ✅ 即時查看 Grok 的使用量（支援 Grok 3 + Grok 4）
* 🎨 美觀流暢的浮動介面，可自由拖曳調整位置
* ⚡ 每 5 秒自動更新一次
* 🧠 安裝後即可於 [grok.com](https://grok.com) 立即使用，無需額外設定
* 🌍 相容於 **Chrome、Edge、Brave** 等主流 Chromium 瀏覽器
* 💯 免費、無廣告
---

## 📸 截圖預覽

### 🔐 SuperGrok 用戶 UI

![Grok Usage Watch screenshot](screenshot.png)

---

### 🆓 Grok 用戶 UI

![Grok Usage Watch screenshot2](screenshot2.png)

---

## 🛠 安裝方式

從 Chrome Web Store 安裝： [點此安裝](https://chrome.google.com/webstore/detail/bmpboaihdkpkjehbceegdmndkonlpdge)

---

## 🧩 專案檔案說明

* `manifest.json`：擴充功能設定與權限定義
* `content.js`：注入頁面的腳本，負責即時抓取並顯示剩餘額度
* `background.js`：點擊工具列圖示可直接開啟 grok.com

---

## 🔐 權限需求

* `"host_permissions": ["https://grok.com/*"]`

所有資料皆僅儲存在本地瀏覽器，不會上傳或分享。

---

## 📜 版本說明

* 此專案先前以「Grok Rate Checker」發佈，版本號最高至 **1.5**。
* 現在重新以 **Grok Usage Watch** 名稱上架，並以 **1.0.2** 為起始版本號。
* 未來版本號將依 Chrome Web Store 釋出進度遞增。

[更新紀錄](./CHANGELOG.md)

---

## 👨‍💻 作者資訊

* 作者：Joshua Wang
* 本工具專為 Grok 重度使用者打造，無論你是開發者、研究員、資料分析師，或是每天頻繁使用 Grok 的一般用戶，都能享受到透明、流暢的使用體驗。

---

## 📬 聯絡方式

有建議或想法嗎？
歡迎 [提交 issue](https://github.com/JoshuaWang2211/grok-usage-watch/issues)