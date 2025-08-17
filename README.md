# 🌟 Grok Usage Watch – Rate Limit Tracker

🔎 Real-time display of your remaining Grok usage (supports Grok 3 and Grok 4)  

📘 [View in Traditional Chinese / 繁體中文](./README.zh-TW.md)

---

## 📌 Introduction

**Grok Usage Watch** Grok Usage Watch is a lightweight browser extension that displays your remaining Grok usage directly on Grok.com.

It supports Grok 3, Grok 4, and Grok 4 Heavy, with a clean, draggable floating window that keeps your usage always visible.

---

## ✨ Key Features

* Real-time usage tracking
* Supports both free and subscribed Grok users
* Draggable, floating overlay UI
* Refill countdown timer when limits are hit 
* Light/Dark mode toggle

---

## 📸 Screenshots

![Grok Usage Watch screenshot](assets/screenshot.png)

---

![Grok Usage Watch screenshot2](assets/screenshot2.png)

---

## 🛠 Installation

Install directly from the Chrome Web Store: [Click here](https://chrome.google.com/webstore/detail/bmpboaihdkpkjehbceegdmndkonlpdge)

---

## 🧩 Project Files

* `manifest.json`: Permissions and extension setup
* `content.js`: Injected script that fetches and displays usage data
* `background.js`: Opens Grok.com when the extension icon is clicked

---

## 🔒 Privacy & Permissions

* `"host_permissions": ["https://grok.com/*"]`  

Everything runs locally in your browser. No data is collected, stored, or shared.

---

## ⚠️ Important Note

This extension relies on Grok.com's current public API. If xAI changes or restricts this API in the future, some features may be affected.

---

## 📜 Changelog

* This project was previously released as “Grok Rate Checker” (up to version 1.5).
* Now relaunched as Grok Usage Watch, starting from version 1.0.2.
* Version numbers will follow Chrome Web Store releases going forward.  

Please see [CHANGELOG](./CHANGELOG.md) for the full update history.

---

## 👨‍💻 Author

* Created by Joshua Wang
* Designed for heavy Grok users, from developers and researchers to data analysts and enthusiasts who want a smooth, transparent experience.

---

## 📬 Feedback

Got suggestions or ideas?  
Feel free to [open an issue](https://github.com/JoshuaWang2211/grok-usage-watch/issues).

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.