
# 🌟 Grok Rate Checker v1.5

> 🔎 即時顯示 Grok 剩餘對話次數（支援 Grok 3 與 Grok 4）

---

## 📢 v1.5 更新說明（2025-07-27）

由於 xAI 調整了 API 設計，**SuperGrok（付費用戶）已改為以 Token 為單位計算查詢配額**，不再回傳傳統的 query 次數資訊。因此，v1.5 版本加入：

* 自動偵測使用者類型（免費 vs 付費）
* 付費用戶將看到「Low Effort / High Effort」對應的 token 顯示
* 免費用戶仍維持舊版對話次數查詢模式
* UI 會根據偵測結果自動切換，無須設定

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
* 🪙 付費用戶支援 Token 顯示（Low Effort / High Effort 模式）
* 🔄 免費用戶維持 query-based 顯示（與舊版相容）
* 🎨 有風格且動畫平滑的浮動介面
* 🧲 完全可拖曳的位置設計
* ⚡ 每 5 秒自動更新一次
* 🧠 安裝後可立即在 [grok.com](https://grok.com) 運作，無需設定
* 🌍 相容於 **Chrome、Edge、Brave** 等 Chromium 核心瀏覽器

---

## 📸 截圖預覽

### 🔐 付費用戶（SuperGrok）UI

顯示 Token 機制（Low / High Effort 分開計算）：

![Grok Rate Checker screenshot](screenshot.png)

---

### 🆓 免費用戶 UI

使用傳統對話次數查詢邏輯：

![Grok Rate Checker screenshot2](screenshot2.png)

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
