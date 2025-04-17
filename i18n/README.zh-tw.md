
# 🌟 Grok 對話額度顯示工具（Grok Rate Checker）

> 🔎 即時查看 Grok 對話額度（支援 Default Chat、DeepSearch、DeeperSearch、Think）

---

## 📌 這是什麼？

**Grok 對話額度顯示工具** 是一款輕量級瀏覽器擴充功能，可即時顯示你的 **Grok 對話額度**，再也不必猜測還剩多少次了！

🧠 可追蹤以下模式的使用情況：
- **Default Chat**（一般對話）
- **DeepSearch** (進階搜尋)
- **DeeperSearch** (更深入的搜尋)
- **Think**（推理模式）

額度資訊會以優雅、可拖曳的浮動介面即時呈現。

---

## ✨ 功能特色

- ✅ 即時顯示 Grok 對話額度
- 🎨 漂亮且有動畫的浮動介面
- 🧲 完全可自由拖曳
- ⚡ 每 5 秒自動刷新
- 🧠 在 [grok.com](https://grok.com) 上即裝即用，無需設定
- 🌍 相容於 **Chrome、Edge、Brave** 等 Chromium 系列瀏覽器

---

## 📸 截圖

![Grok Rate Checker screenshot](../screenshot.png)

---

## 🛠 安裝方式

1. 複製或下載此專案
2. 打開 `chrome://extensions/`
3. 開啟 **開發人員模式**
4. 點選 **「載入未封裝項目」**
5. 選擇此專案的資料夾
6. 前往 [https://grok.com](https://grok.com)，即可開始使用 🎉

---

## 🧩 檔案簡介

- `manifest.json` – 擴充功能的設定與權限
- `content.js` – 注入頁面的腳本，負責即時取得並顯示對話額度

---

## 📤 使用的 API

此擴充功能會查詢以下端點：

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

**預期回應內容：**
```json
{
  "remainingQueries": 42,
  "totalQueries": 50
}
```

---

## 🔐 權限需求

- `"activeTab"`
- `"storage"`
- `"host_permissions": ["https://grok.com/*"]`

不會將任何資料儲存或傳送至本地以外的地方。

---

## 👨‍💻 作者
由 Joshua Wang 開發

專為 Grok 重度使用者打造 — 無論你是開發者、研究人員、數據分析師，還是每天都用爆 Grok 的 AI 愛用者。本擴充功能以清晰透明與順暢的體驗為設計核心 🧠✨

## 📜 授權條款
本專案採用 MIT 授權，詳情請參見 [LICENSE](./LICENSE)。

## 📬 聯絡方式
如果你有任何建議或想法：  
歡迎 [提交 issue](https://github.com/JoshuaWang2211/grok-rate-checker/issues)  
或透過 X (原 Twitter) 與我聯繫：[@JoshuaWang2211](https://x.com/JoshuaWang2211) 
