
# 🌟 Grok 쿼리 잔여량 확인기

> 🔎 Grok 쿼리 사용량을 실시간으로 확인 (Default Chat, DeepSearch, DeeperSearch, Think 지원)

---

## 📌 이게 뭐예요?

**Grok Rate Checker**는 브라우저에 설치하는 가벼운 확장 프로그램으로, **Grok 쿼리 잔여 횟수**를 실시간으로 보여줍니다.  
이제 더 이상 몇 번 남았는지 추측하지 않아도 돼요!

🧠 지원 모드:
- **Default Chat** (기본 쿼리)
- **DeepSearch**
- **DeeperSearch**
- **Think** (추론 모드)

남은 횟수와 전체 한도를 드래그 가능한 세련된 플로팅 UI에 표시합니다.

---

## ✨ 주요 기능

- ✅ Grok 쿼리 잔여량 실시간 표시
- 🎨 애니메이션이 있는 스타일리시한 UI
- 🧲 완전한 드래그 지원
- ⚡ 5초마다 자동 새로고침
- 🧠 [grok.com](https://grok.com)에서 즉시 작동, 별도 설정 불필요
- 🌍 **Chrome, Edge, Brave** 등 Chromium 기반 브라우저와 호환

---

## 📸 스크린샷

![Grok Rate Checker screenshot](../screenshot.png)

---

## 🛠 설치 방법

1. 이 저장소를 클론하거나 다운로드
2. `chrome://extensions/`로 이동
3. **개발자 모드** 활성화
4. **“압축 해제된 확장 프로그램 로드”** 클릭
5. 이 프로젝트 폴더 선택
6. [https://grok.com](https://grok.com)으로 이동하면 완료! 🎉

---

## 🧩 파일 구성

- `manifest.json` – 확장 기능 설정 및 권한
- `content.js` – 쿼리 잔여량을 가져와 표시하는 스크립트

---

## 📤 사용 API

다음 엔드포인트를 사용합니다:

```
POST https://grok.com/rest/rate-limits
```

**요청 예시:**
```json
{
  "requestKind": "DEFAULT",
  "modelName": "grok-3"
}
```

**응답 예시:**
```json
{
  "remainingQueries": 42,
  "totalQueries": 50
}
```

---

## 🔐 권한

- `"activeTab"`
- `"storage"`
- `"host_permissions": ["https://grok.com/*"]`

데이터는 로컬 브라우저 내에만 저장되며 외부로 전송되지 않습니다.

---

## 👨‍💻 제작자
Joshua Wang 개발

Grok을 자주 사용하는 개발자, 연구자, 분석가 또는 AI 매니아를 위해 제작되었습니다. 투명성과 부드러운 UX를 목표로 설계되었습니다. 🧠✨

## 📜 라이선스
MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.

## 📬 연락하기
피드백이나 제안이 있다면:  
[이슈 열기](https://github.com/JoshuaWang2211/grok-rate-checker/issues)  
또는 X(구 Twitter)에서 연락해주세요: [@JoshuaWang2211](https://x.com/JoshuaWang2211)
