# 🌟 Grok Usage Watch – Rate Limit Tracker

🔎 Real-time display of your remaining Grok usage (supports Grok 3 and Grok 4)  

📘 [View in Traditional Chinese / 繁體中文](./README.zh-TW.md)

---

## 📌 Introduction

**Grok Usage Watch** is a lightweight browser extension that shows your remaining Grok queries directly on Grok.com. It also displays the effort level of each request (as determined by Grok itself), so you can better understand how resources are being used.

Whether you use Grok 3, Grok 4, or Grok 4 Heavy, you can easily track your usage and token status in a clean floating window. Works immediately on grok.com after installation. No setup required.

---

## ✨ Key Features

* ✅ Real-time usage monitoring
* 🎨 Floating, draggable overlay UI
* ⚡ Refreshes every 5 seconds
* 🌍 Compatible with **Chrome, Edge, Brave**, and other Chromium-based browsers
* 🆓 Free, no ads

---

## 📸 Screenshots

### 🔐 Subscribed Users

![Grok Usage Watch screenshot](screenshot.png)

---

### 🆓 Free Plan Users

![Grok Usage Watch screenshot2](screenshot2.png)

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