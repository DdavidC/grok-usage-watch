
# 🌟 Verificador de Cuotas Grok

> 🔎 Visualiza en tiempo real tu saldo de consultas en Grok (Default Chat, DeepSearch, DeeperSearch, Think)

---

## 📌 ¿Qué es esto?

**Grok Rate Checker** es una extensión de navegador ligera que muestra en tiempo real tu **saldo de consultas Grok** — ¡olvídate de adivinar!

🧠 Soporta los modos:
- **Default Chat** (consultas estándar)
- **DeepSearch**
- **DeeperSearch**
- **Think** (modo de razonamiento)

Muestra los límites restantes y totales en una interfaz flotante elegante y arrastrable.

---

## ✨ Características

- ✅ Visualización en tiempo real del saldo de consultas
- 🎨 Interfaz flotante animada y elegante
- 🧲 Totalmente arrastrable
- ⚡ Se actualiza cada 5 segundos
- 🧠 Funciona al instante en [grok.com](https://grok.com)
- 🌍 Compatible con **Chrome, Edge, Brave**, y más

---

## 📸 Captura de pantalla

![Grok Rate Checker screenshot](../screenshot.png)

---

## 🛠 Instalación

1. Clona o descarga este repositorio
2. Ve a `chrome://extensions/`
3. Activa el **modo desarrollador**
4. Haz clic en **"Cargar sin empaquetar"**
5. Selecciona la carpeta del proyecto
6. Navega a [https://grok.com](https://grok.com) — ¡y listo! 🎉

---

## 🧩 Archivos

- `manifest.json` – Configuración y permisos de la extensión
- `content.js` – Script que obtiene y muestra los límites en tiempo real

---

## 📤 API usada

```
POST https://grok.com/rest/rate-limits
```

Ejemplo de solicitud:
```json
{
  "requestKind": "DEFAULT",
  "modelName": "grok-3"
}
```

Respuesta esperada:
```json
{
  "remainingQueries": 42,
  "totalQueries": 50
}
```

---

## 🔐 Permisos

- `"activeTab"`
- `"storage"`
- `"host_permissions": ["https://grok.com/*"]`

No se almacena ni comparte ningún dato fuera del navegador local.

---

## 👨‍💻 Autor
Creado por Joshua Wang

Pensado para usuarios intensivos de Grok: desarrolladores, investigadores, analistas o fanáticos del AI. Diseñado para ofrecer una experiencia fluida y transparente. 🧠✨

## 📜 Licencia
Este proyecto está bajo licencia MIT — ver [LICENSE](../LICENSE).

## 📬 Contacto
¿Tienes sugerencias o comentarios?  
[Abre una issue](https://github.com/JoshuaWang2211/grok-rate-checker/issues)  
o contáctame por X (antes Twitter): [@JoshuaWang2211](https://x.com/JoshuaWang2211)
