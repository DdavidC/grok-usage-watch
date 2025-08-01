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
    displayDiv.id = "grok-rate-checker";
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
    displayDiv.style.minWidth = "200px";
    displayDiv.onmouseover = () => displayDiv.style.transform = "scale(1.05)";
    displayDiv.onmouseout = () => displayDiv.style.transform = "scale(1)";
    
    if (document.body) {
      document.body.appendChild(displayDiv);
      makeDraggable(displayDiv);
    }
  }
}

function updateDisplay(data) {
  createDisplay();
  const shouldFade = (kind, type) => lastData[kind][type] !== null && lastData[kind][type] !== data[kind][type];

  const isPaidUser = data.DEFAULT?.remainingTokens !== undefined && data.DEFAULT?.remainingTokens !== null;
  const hasTokenData = isPaidUser && (data.DEFAULT.totalTokens > 0 || data.DEFAULT.remainingTokens > 0);

  let tokenSectionHtml = '';
  
  if (hasTokenData) {
    tokenSectionHtml = `
      <div style="font-size: 14px; color: #34495e; font-weight: bold; margin-bottom: 4px;">Tokens</div>
      <div style="display: table; font-size: 16px; width: 100%;">
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Low Effort:</span>
          <span style="display: table-cell; text-align: right; color: #2980b9;">${data.DEFAULT?.lowEffortRateLimits?.remainingQueries || 0} / ${data.DEFAULT?.totalTokens || 'N/A'}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">High Effort:</span>
          <span style="display: table-cell; text-align: right; color: #e67e22;">${data.DEFAULT?.highEffortRateLimits?.remainingQueries || 0} / ${data.DEFAULT?.highEffortRateLimits?.cost && data.DEFAULT?.totalTokens ? Math.floor(data.DEFAULT.totalTokens / data.DEFAULT.highEffortRateLimits.cost) : 'N/A'}</span>
        </div>
      </div>
    `;
  } else {
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
    specialFeaturesHtml = `<div style="font-size: 14px; color: #34495e; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">Special Features</div>`;
  }

  if (displayDiv) {
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
  }
  
  lastData = { ...data };
  addAnimationStyles();
}

function addAnimationStyles() {
  if (!document.head.querySelector("#grok-checker-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "grok-checker-styles";
    styleSheet.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      #grok-rate-checker {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
    `;
    document.head.appendChild(styleSheet);
  }
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
    if (response.status === 401 || response.status === 403) {
      throw new Error('UNAUTHORIZED');
    }
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Request failed for ${kind} (${model}) with status: ${response.status}`);
    }
  });
}

function checkRateLimits() {
  const baseQueries = [
    { kind: "DEFAULT", model: "grok-3", displayKey: "DEFAULT" },
    { kind: "DEEPSEARCH", model: "grok-3", displayKey: "DEEPSEARCH" },
    { kind: "DEEPERSEARCH", model: "grok-3", displayKey: "DEEPERSEARCH" },
    { kind: "REASONING", model: "grok-3", displayKey: "REASONING" }
  ];
  
  const results = {};
  let isUnauthorized = false;

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
      })
      .catch(err => {
        if (err.message === 'UNAUTHORIZED') {
          isUnauthorized = true;
        }
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
      })
  ))
  .then(() => {
    createDisplay();
    
    if (isUnauthorized) {
      if (displayDiv) {
        displayDiv.innerHTML = `
          <strong style="color: #2c3e50; font-size: 16px; display: block; text-align: center;">Grok Query Balance</strong>
          <div style="margin-top: 8px;">
            <div style="display: table; font-size: 16px; width: 100%;">
              <div style="display: table-row;">
                <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Grok 3:</span>
                <span style="display: table-cell; text-align: right; color: #7f8c8d;">Loading...</span>
              </div>
            </div>
          </div>
        `;
      }
      return;
    }

    const allZeroQueries = (
      (results.DEEPSEARCH?.remaining === 0 && results.DEEPSEARCH?.total === 0) &&
      (results.DEEPERSEARCH?.remaining === 0 && results.DEEPERSEARCH?.total === 0) &&
      (results.REASONING?.remaining === 0 && results.REASONING?.total === 0)
    );
    
    if (allZeroQueries) {
      if (displayDiv) {
        displayDiv.innerHTML = `
          <strong style="color: #2c3e50; font-size: 16px; display: block; text-align: center;">Grok Query Balance</strong>
          <div style="margin-top: 8px;">
            <div style="display: table; font-size: 16px; width: 100%;">
              <div style="display: table-row;">
                <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Grok 3:</span>
                <span style="display: table-cell; text-align: right; color: #2980b9;">${results.DEFAULT?.lowEffortRateLimits?.remainingQueries || 0} / ${results.DEFAULT?.totalTokens || 'N/A'}</span>
              </div>
            </div>
          </div>
        `;
      }
      return;
    }

    const isPaidUser = results.DEFAULT?.remainingTokens !== undefined && results.DEFAULT?.remainingTokens !== null;
    const hasTokenData = isPaidUser && (results.DEFAULT.totalTokens > 0 || results.DEFAULT.remainingTokens > 0);
    
    if (hasTokenData) {
      fetchRateLimits("DEFAULT", "grok-4-heavy")
        .then(data => {
          results.GROK4HEAVY = {
            remaining: data.remainingQueries,
            total: data.totalQueries
          };
          updateDisplay(results);
        })
        .catch(err => {
          results.GROK4HEAVY = { 
            remaining: "Error", 
            total: "Error"
          };
          updateDisplay(results);
        });
    } else {
      updateDisplay(results);
    }
  })
  .catch(err => {
    console.log("Error in checkRateLimits:", err);
  });
}

checkRateLimits();
setInterval(checkRateLimits, 5000);

document.addEventListener("submit", function() {
  setTimeout(checkRateLimits, 1000);
});
