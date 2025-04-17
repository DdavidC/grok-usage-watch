
# 🌟 Grok 对话额度显示工具（Grok Rate Checker）

> 🔎 即时查看 Grok 查对话额度（支援 Default Chat、DeepSearch、DeeperSearch、Think）

---

## 📌 这是什么？

**Grok 对话额度显示工具** 是一款轻量级浏览器扩展程序，可即时顯示你的 **Grok 对话额度**，再也不必猜测还剩多少次了！

🧠 可追踪以下模式的使用情况：
- **Default Chat**（一般对话）
- **DeepSearch** (进阶搜寻)
- **DeeperSearch** (更深入的搜寻)
- **Think**（推理模式）

额度资讯会以优雅、可拖动的浮动介面即时呈现。

---

## ✨ 功能特色

- ✅ 即时顯示 Grok 对话额度
- 🎨 漂亮且有动画的浮动介面
- 🧲 完全可自由拖曳
- ⚡ 每 5 秒自动刷新
- 🧠 在 [grok.com](https://grok.com) 上即装即用，无需设定
- 🌍 相容于 **Chrome、Edge、Brave** 等 Chromium 系列浏览器

---

## 📸 截图

![Grok Rate Checker screenshot](../screenshot.png)

---

## 🛠 安装方式

1. 复制或下载此专案
2. 打開 `chrome://extensions/`
3. 开启 **开发者模式**
4. 点击 **「加载未打包的项目」**
5. 选择此专案的文件夹
6. 前往 [https://grok.com](https://grok.com)，即可开始使用🎉

---

## 🧩 文件说明

- `manifest.json` – 扩展程序的设定与权限
- `content.js` – 注入页面的脚本，负责即时取得并显示对话额度

---

## 📤 使用的 API

此扩展程序会查询以下端点：

```
POST https://grok.com/rest/rate-limits
```

**示例请求内容：**
```json
{
  "requestKind": "DEFAULT",
  "modelName": "grok-3"
}
```

**预期响应内容：**
```json
{
  "remainingQueries": 42,
  "totalQueries": 50
}
```

---

## 🔐 权限需求

- `"activeTab"`
- `"storage"`
- `"host_permissions": ["https://grok.com/*"]`

不会将任何数据储存或发送到本地以外的地方。

---

## 👨‍💻 作者
由 Joshua Wang 開發

专为 Grok 重度用戶打造 — 无论你是开发者、研究人员、数据分析师，还是每天都用爆 Grok 的 AI 爱用者。本扩展程序以清晰透明与顺畅的体验为设计核心 🧠✨

## 📜 授权条款
本专案采用 MIT 授权，详情请参见 [LICENSE](./LICENSE)。

## 📬 联系方式
如果你有任何建议或想法：
欢迎 [提交 issue（问题）](https://github.com/JoshuaWang2211/grok-rate-checker/issues)  
或通过 X (原 Twitter) 与我联系：[@JoshuaWang2211](https://x.com/JoshuaWang2211)
