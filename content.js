let displayDiv = null;
let lastData = { 
  DEFAULT: { remaining: null, total: null }, 
  DEEPSEARCH: { remaining: null, total: null }, 
  REASONING: { remaining: null, total: null },
  DEEPERSEARCH: { remaining: null, total: null }
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
    displayDiv.style.top = "200px";
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
    <strong style="color: #2c3e50; font-size: 16px;">Grok Query Balance</strong>
    <div style="display: table; margin-top: 8px; font-size: 16px;">
      <div style="display: table-row;">
        <span style="display: table-cell; padding-right: 12px; color: #5f6a6a;">Default Chat:</span>
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

function fetchRateLimits(kind) {
  return fetch("https://grok.com/rest/rate-limits", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      requestKind: kind,
      modelName: "grok-3"
    })
  })
  .then(response => {
    console.log(`Request status for ${kind}:`, response.status);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Request failed for ${kind} with status: ${response.status}`);
    }
  });
}

function checkRateLimits() {
  const requestKinds = ["DEFAULT", "DEEPSEARCH", "DEEPERSEARCH", "REASONING"];
  const results = {};

  Promise.all(requestKinds.map(kind => 
    fetchRateLimits(kind)
      .then(data => {
        if (data.remainingQueries !== undefined && data.totalQueries !== undefined) {
          results[kind] = {
            remaining: data.remainingQueries,
            total: data.totalQueries
          };
        } else {
          results[kind] = { remaining: "N/A", total: "N/A" };
          console.log(`No query data for ${kind}:`, data);
        }
      })
      .catch(err => {
        results[kind] = { remaining: "Error", total: "Error" };
        console.log(`Error fetching rate-limits for ${kind}:`, err);
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