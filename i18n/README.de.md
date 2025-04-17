
# 🌟 Grok-Abfragezähler

> 🔎 Zeigt den aktuellen Grok-Abfragestatus in Echtzeit an (Default Chat, DeepSearch, DeeperSearch, Think)

---

## 📌 Was ist das?

**Grok Rate Checker** ist eine schlanke Browser-Erweiterung, die deine verbleibenden **Grok-Abfragen** in Echtzeit anzeigt — kein Raten mehr nötig!

🧠 Unterstützte Modi:
- **Default Chat** (Standardabfragen)
- **DeepSearch**
- **DeeperSearch**
- **Think** (Denkmodus)

Zeigt verbleibende und maximale Limits in einer eleganten, verschiebbaren Floating-UI an.

---

## ✨ Funktionen

- ✅ Anzeige der Grok-Abfragen in Echtzeit
- 🎨 Stilvolle, animierte Floating-Benutzeroberfläche
- 🧲 Vollständig verschiebbar
- ⚡ Automatische Aktualisierung alle 5 Sekunden
- 🧠 Funktioniert sofort auf [grok.com](https://grok.com)
- 🌍 Kompatibel mit **Chrome, Edge, Brave**, u. a.

---

## 📸 Screenshot

![Grok Rate Checker screenshot](../screenshot.png)

---

## 🛠 Installation

1. Dieses Repository klonen oder herunterladen
2. Öffne `chrome://extensions/`
3. Aktiviere den **Entwicklermodus**
4. Klicke auf **„Entpackte Erweiterung laden“**
5. Wähle den Projektordner aus
6. Öffne [https://grok.com](https://grok.com) – und los geht’s! 🎉

---

## 🧩 Dateien

- `manifest.json` – Konfiguration und Berechtigungen der Erweiterung
- `content.js` – Script zum Abrufen und Anzeigen der Limits

---

## 📤 Verwendete API

```
POST https://grok.com/rest/rate-limits
```

Beispiel-Anfrage:
```json
{
  "requestKind": "DEFAULT",
  "modelName": "grok-3"
}
```

Erwartete Antwort:
```json
{
  "remainingQueries": 42,
  "totalQueries": 50
}
```

---

## 🔐 Berechtigungen

- `"activeTab"`
- `"storage"`
- `"host_permissions": ["https://grok.com/*"]`

Keine Daten werden außerhalb deines lokalen Browsers gespeichert oder übertragen.

---

## 👨‍💻 Autor
Erstellt von Joshua Wang

Für Heavy-User von Grok entwickelt – egal ob Entwickler, Forscher, Analyst oder AI-Enthusiast. Mit Fokus auf Transparenz und reibungslose UX. 🧠✨

## 📜 Lizenz
Lizensiert unter MIT – siehe [LICENSE](../LICENSE).

## 📬 Kontakt
Fragen oder Vorschläge?  
[Issue eröffnen](https://github.com/JoshuaWang2211/grok-rate-checker/issues)  
oder mich auf X (früher Twitter) kontaktieren: [@JoshuaWang2211](https://x.com/JoshuaWang2211)
