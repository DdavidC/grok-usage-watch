let displayDiv = null;
let lastData = { 
  DEFAULT: { remaining: null, total: null }, 
  DEEPSEARCH: { remaining: null, total: null }, 
  REASONING: { remaining: null, total: null },
  DEEPERSEARCH: { remaining: null, total: null },
  GROK4: { remaining: null, total: null },
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

  displayDiv.innerHTML = `
    <strong style="color: #2c3e50; font-size: 16px; display: block; text-align: center;">Grok Query Balance</strong>
    <div style="margin-top: 8px;">
      <div style="font-size: 14px; color: #34495e; font-weight: bold; margin-bottom: 4px;">Grok 3</div>
      <div style="display: table; font-size: 16px; width: 100%;">
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Default:</span>
          <span style="display: table-cell; text-align: right; color: #2980b9; ${shouldFade('DEFAULT', 'remaining') || shouldFade('DEFAULT', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.DEFAULT.remaining} / ${data.DEFAULT.total}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">DeepSearch:</span>
          <span style="display: table-cell; text-align: right; color: #27ae60; ${shouldFade('DEEPSEARCH', 'remaining') || shouldFade('DEEPSEARCH', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.DEEPSEARCH.remaining} / ${data.DEEPSEARCH.total}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">DeeperSearch:</span>
          <span style="display: table-cell; text-align: right; color: #c0392b; ${shouldFade('DEEPERSEARCH', 'remaining') || shouldFade('DEEPERSEARCH', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.DEEPERSEARCH.remaining} / ${data.DEEPERSEARCH.total}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Think:</span>
          <span style="display: table-cell; text-align: right; color: #8e44ad; ${shouldFade('REASONING', 'remaining') || shouldFade('REASONING', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.REASONING.remaining} / ${data.REASONING.total}</span>
        </div>
      </div>
      <div style="font-size: 14px; color: #34495e; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">Grok 4</div>
      <div style="display: table; font-size: 16px; width: 100%;">
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Default:</span>
          <span style="display: table-cell; text-align: right; color: #e67e22; ${shouldFade('GROK4', 'remaining') || shouldFade('GROK4', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.GROK4.remaining} / ${data.GROK4.total}</span>
        </div>
        <div style="display: table-row;">
          <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Heavy:</span>
          <span style="display: table-cell; text-align: right; color: #2c3e50; ${shouldFade('GROK4HEAVY', 'remaining') || shouldFade('GROK4HEAVY', 'total') ? 'animation: fadeIn 0.5s;' : ''}">${data.GROK4HEAVY.remaining} / ${data.GROK4HEAVY.total}</span>
        </div>
      </div>
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
  const queries = [
    { kind: "DEFAULT", model: "grok-3" },
    { kind: "DEEPSEARCH", model: "grok-3" },
    { kind: "DEEPERSEARCH", model: "grok-3" },
    { kind: "REASONING", model: "grok-3" },
    { kind: "DEFAULT", model: "grok-4" },  // Grok 4
    { kind: "DEFAULT", model: "grok-4-heavy" }  // Grok 4 Heavy
  ];
  const results = {};

  Promise.all(queries.map(({ kind, model }) => 
    fetchRateLimits(kind, model)
      .then(data => {
        let key;
        if (model === "grok-4") {
          key = "GROK4";
        } else if (model === "grok-4-heavy") {
          key = "GROK4HEAVY";
        } else {
          key = kind;
        }
        if (data.remainingQueries !== undefined && data.totalQueries !== undefined) {
          results[key] = {
            remaining: data.remainingQueries,
            total: data.totalQueries
          };
        } else {
          results[key] = { remaining: "N/A", total: "N/A" };
          console.log(`No query data for ${key}:`, data);
        }
      })
      .catch(err => {
        let key;
        if (model === "grok-4") {
          key = "GROK4";
        } else if (model === "grok-4-heavy") {
          key = "GROK4HEAVY";
        } else {
          key = kind;
        }
        results[key] = { remaining: "Error", total: "Error" };
        console.log(`Error fetching rate-limits for ${key}:`, err);
      })
  ))
  .then(() => {
    updateDisplay(results);
  });
}

console.log("Grok Rate Checker loaded");
checkRateLimits();
setInterval(checkRateLimits, 5000);

document.addEventListener("submit", function() {
  console.log("Form submitted, checking rate-limits...");
  setTimeout(checkRateLimits, 1000);
});