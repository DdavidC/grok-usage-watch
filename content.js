let displayDiv = null;
let lastData = { 
  DEFAULT: { remaining: null, total: null, remainingTokens: null, totalTokens: null }, 
  DEEPSEARCH: { remaining: null, total: null }, 
  REASONING: { remaining: null, total: null },
  DEEPERSEARCH: { remaining: null, total: null },
  GROK4HEAVY: { remaining: null, total: null }
};

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  function initializePosition() {
    if (!element.style.left) {
      const rect = element.getBoundingClientRect();
      element.style.left = `${rect.left}px`;
      element.style.right = "auto";
    }
  }

  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    initializePosition();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function createDisplay() {
  if (!displayDiv) {
    displayDiv = document.createElement("div");
    displayDiv.style.position = "fixed";
    displayDiv.style.top = "150px";
    displayDiv.style.right = "20px";
    displayDiv.style.background = "linear-gradient(135deg, #f5f7fa, #c3cfe2)";
    displayDiv.style.padding = "12px";
    displayDiv.style.border = "1px solid #999";
    displayDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    displayDiv.style.color = "#333";
    displayDiv.style.zIndex = "10000";
    displayDiv.style.borderRadius = "8px";
    displayDiv.style.fontFamily = "Arial, sans-serif";
    displayDiv.style.cursor = "move";
    displayDiv.style.transition = "transform 0.2s ease";
    displayDiv.onmouseover = () => displayDiv.style.transform = "scale(1.05)";
    displayDiv.onmouseout = () => displayDiv.style.transform = "scale(1)";
    document.body.appendChild(displayDiv);
    makeDraggable(displayDiv);
  }
}

function updateDisplay(data) {
  createDisplay();
  const shouldFade = (kind, type) => lastData[kind][type] !== null && lastData[kind][type] !== data[kind][type];

  // 自動偵測用戶類型：檢查是否有 token 數據
  const isPaidUser = data.DEFAULT?.remainingTokens !== undefined && data.DEFAULT?.remainingTokens !== null;
  const hasTokenData = isPaidUser && (data.DEFAULT.totalTokens > 0 || data.DEFAULT.remainingTokens > 0);

  let tokenSectionHtml = '';
  
  if (hasTokenData) {
    // 付費用戶：顯示 Token 系統
    tokenSectionHtml = `
      <div style="font-size: 14px; color: #34495e; font-weight: bold; margin-bottom: 4px;">Tokens</div>
      <div style="display: table; font-size: 16px; width: 100%;">
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Low Effort:</span>
          <span style="display: table-cell; text-align: right; color: #2980b9;">${data.DEFAULT?.lowEffortRateLimits?.remainingQueries || 0} / ${data.DEFAULT?.totalTokens || 140}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">High Effort:</span>
          <span style="display: table-cell; text-align: right; color: #e67e22;">${data.DEFAULT?.highEffortRateLimits?.remainingQueries || 0} / ${Math.floor((data.DEFAULT?.totalTokens || 140) / 4)}</span>
        </div>
      </div>
    `;
  } else {
    // 免費用戶：顯示傳統 Query 系統
    tokenSectionHtml = `
      <div style="display: table; font-size: 16px; width: 100%;">
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Grok 3:</span>
          <span style="display: table-cell; text-align: right; color: #2980b9; ${shouldFade('DEFAULT', 'remaining') || shouldFade('DEFAULT', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.DEFAULT?.remaining || 0} / ${data.DEFAULT?.total || 0}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">DeepSearch:</span>
          <span style="display: table-cell; text-align: right; color: #27ae60; ${shouldFade('DEEPSEARCH', 'remaining') || shouldFade('DEEPSEARCH', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.DEEPSEARCH?.remaining || 0} / ${data.DEEPSEARCH?.total || 0}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">DeeperSearch:</span>
          <span style="display: table-cell; text-align: right; color: #c0392b; ${shouldFade('DEEPERSEARCH', 'remaining') || shouldFade('DEEPERSEARCH', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.DEEPERSEARCH?.remaining || 0} / ${data.DEEPERSEARCH?.total || 0}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Think:</span>
          <span style="display: table-cell; text-align: right; color: #8e44ad; ${shouldFade('REASONING', 'remaining') || shouldFade('REASONING', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.REASONING?.remaining || 0} / ${data.REASONING?.total || 0}</span>
        </div>
      </div>
    `;
  }

  let specialFeaturesHtml = '';
  if (hasTokenData) {
    // 付費用戶顯示分類標題
    specialFeaturesHtml = `<div style="font-size: 14px; color: #34495e; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">Special Features</div>`;
  }

  displayDiv.innerHTML = `
    <strong style="color: #2c3e50; font-size: 16px; display: block; text-align: center;">Grok Query Balance</strong>
    <div style="margin-top: 8px;">
      ${tokenSectionHtml}
      ${hasTokenData ? specialFeaturesHtml : ''}
      ${hasTokenData ? `
      <div style="display: table; font-size: 16px; width: 100%;">
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">DeepSearch:</span>
          <span style="display: table-cell; text-align: right; color: #27ae60; ${shouldFade('DEEPSEARCH', 'remaining') || shouldFade('DEEPSEARCH', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.DEEPSEARCH?.remaining || 0} / ${data.DEEPSEARCH?.total || 0}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">DeeperSearch:</span>
          <span style="display: table-cell; text-align: right; color: #c0392b; ${shouldFade('DEEPERSEARCH', 'remaining') || shouldFade('DEEPERSEARCH', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.DEEPERSEARCH?.remaining || 0} / ${data.DEEPERSEARCH?.total || 0}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Think:</span>
          <span style="display: table-cell; text-align: right; color: #8e44ad; ${shouldFade('REASONING', 'remaining') || shouldFade('REASONING', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.REASONING?.remaining || 0} / ${data.REASONING?.total || 0}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Grok 4 Heavy:</span>
          <span style="display: table-cell; text-align: right; color: #2c3e50; ${shouldFade('GROK4HEAVY', 'remaining') || shouldFade('GROK4HEAVY', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.GROK4HEAVY?.remaining || 0} / ${data.GROK4HEAVY?.total || 0}</span>
        </div>
      </div>` : ''}
    </div>
  `;
  lastData = { ...data };

  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  if (!document.head.querySelector("style[data-fadein]")) {
    styleSheet.setAttribute("data-fadein", "true");
    document.head.appendChild(styleSheet);
  }
  
  // 用於除錯：顯示偵測結果
  console.log(`User type detected: ${hasTokenData ? 'Paid (SuperGrok)' : 'Free'} - Token data available: ${isPaidUser}`);
  console.log("Display updated:", data);
}

function fetchRateLimits(kind, model) {
  return fetch("https://grok.com/rest/rate-limits", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      requestKind: kind,
      modelName: model
    })
  })
  .then(response => {
    console.log(`Request status for ${kind} (${model}):`, response.status);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Request failed for ${kind} (${model}) with status: ${response.status}`);
    }
  });
}

function checkRateLimits() {
  // 基本查詢（所有用戶都需要）
  const baseQueries = [
    { kind: "DEFAULT", model: "grok-3", displayKey: "DEFAULT" },
    { kind: "DEEPSEARCH", model: "grok-3", displayKey: "DEEPSEARCH" },
    { kind: "DEEPERSEARCH", model: "grok-3", displayKey: "DEEPERSEARCH" },
    { kind: "REASONING", model: "grok-3", displayKey: "REASONING" }
  ];
  
  const results = {};

  // 先執行基本查詢
  Promise.all(baseQueries.map(({ kind, model, displayKey }) => 
    fetchRateLimits(kind, model)
      .then(data => {
        if (displayKey === 'DEFAULT') {
          results[displayKey] = {
            remaining: data.remainingQueries,
            total: data.totalQueries,
            remainingTokens: data.remainingTokens,
            totalTokens: data.totalTokens,
            lowEffortRateLimits: data.lowEffortRateLimits,
            highEffortRateLimits: data.highEffortRateLimits,
            windowSizeSeconds: data.windowSizeSeconds
          };
        } else {
          results[displayKey] = {
            remaining: data.remainingQueries,
            total: data.totalQueries
          };
        }
        console.log(`Rate limit data for ${displayKey}:`, data);
      })
      .catch(err => {
        if (displayKey === 'DEFAULT') {
          results[displayKey] = { 
            remaining: "Error", 
            total: "Error",
            remainingTokens: null,
            totalTokens: null
          };
        } else {
          results[displayKey] = { 
            remaining: "Error", 
            total: "Error"
          };
        }
        console.log(`Error fetching rate-limits for ${displayKey}:`, err);
      })
  ))
  .then(() => {
    // 檢查是否為付費用戶
    const isPaidUser = results.DEFAULT?.remainingTokens !== undefined && results.DEFAULT?.remainingTokens !== null;
    const hasTokenData = isPaidUser && (results.DEFAULT.totalTokens > 0 || results.DEFAULT.remainingTokens > 0);
    
    if (hasTokenData) {
      // 付費用戶：查詢 Grok 4 Heavy
      fetchRateLimits("DEFAULT", "grok-4-heavy")
        .then(data => {
          results.GROK4HEAVY = {
            remaining: data.remainingQueries,
            total: data.totalQueries
          };
          console.log('Rate limit data for GROK4HEAVY:', data);
          updateDisplay(results);
        })
        .catch(err => {
          results.GROK4HEAVY = { 
            remaining: "Error", 
            total: "Error"
          };
          console.log('Error fetching rate-limits for GROK4HEAVY:', err);
          updateDisplay(results);
        });
    } else {
      // 免費用戶：直接顯示結果
      updateDisplay(results);
    }
  });
}

console.log("Grok Rate Checker loaded");
checkRateLimits();
setInterval(checkRateLimits, 5000);

document.addEventListener("submit", function() {
  console.log("Form submitted, checking rate-limits...");
  setTimeout(checkRateLimits, 1000);
});