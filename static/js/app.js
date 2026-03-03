const form = document.getElementById("tutorForm");
const questionInput = document.getElementById("question");
const levelInput = document.getElementById("level");
const maxTokensInput = document.getElementById("maxTokens");
const levelLabel = document.getElementById("levelLabel");
const maxTokensLabel = document.getElementById("maxTokensLabel");
const responseBox = document.getElementById("response");
const clearBtn = document.getElementById("clearBtn");
const askBtn = document.getElementById("askBtn");
const statusPill = document.getElementById("status");

let markdownBuffer = "";
let isGenerating = false;

function setStatus(text, mode = "idle") {
  statusPill.textContent = text;
  statusPill.classList.remove("running", "done");
  if (mode === "running") statusPill.classList.add("running");
  if (mode === "done") statusPill.classList.add("done");
}

function renderResponse(markdownText) {
  if (!markdownText.trim()) {
    responseBox.textContent = "Your answer will appear here...";
    responseBox.style.opacity = "0.5";
    return;
  }
  responseBox.style.opacity = "1";
  responseBox.innerHTML = marked.parse(markdownText);
  responseBox.scrollTop = responseBox.scrollHeight;
}

// Live label updates for sliders
levelInput.addEventListener("input", () => {
  levelLabel.textContent = levelInput.value;
  levelLabel.style.transform = "scale(1.1)";
  setTimeout(() => {
    levelLabel.style.transform = "scale(1)";
  }, 200);
});

maxTokensInput.addEventListener("input", () => {
  maxTokensLabel.textContent = maxTokensInput.value;
  maxTokensLabel.style.transform = "scale(1.1)";
  setTimeout(() => {
    maxTokensLabel.style.transform = "scale(1)";
  }, 200);
});

// Clear button with animation
clearBtn.addEventListener("click", () => {
  questionInput.value = "";
  questionInput.focus();
  markdownBuffer = "";
  renderResponse(markdownBuffer);
  setStatus("Cleared");
  setTimeout(() => setStatus("Idle"), 800);
});

// Form submission with streaming
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (isGenerating) return;

  const question = questionInput.value.trim();
  const level = Number(levelInput.value);
  const maxTokens = Number(maxTokensInput.value);

  if (!question) {
    setStatus("Enter a question first");
    setTimeout(() => setStatus("Idle"), 1500);
    return;
  }

  isGenerating = true;
  askBtn.disabled = true;
  clearBtn.disabled = true;
  markdownBuffer = "";
  renderResponse(markdownBuffer);
  setStatus("Generating...", "running");

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, level, max_tokens: maxTokens }),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      throw new Error(errorPayload.error || "Request failed");
    }

    if (!response.body) {
      throw new Error("Streaming not supported by this browser.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      markdownBuffer += decoder.decode(value, { stream: true });
      renderResponse(markdownBuffer);
    }

    setStatus("Completed", "done");
  } catch (error) {
    markdownBuffer += `\n\n**❌ Error:** ${error.message}`;
    renderResponse(markdownBuffer);
    setStatus("Failed");
  } finally {
    isGenerating = false;
    askBtn.disabled = false;
    clearBtn.disabled = false;
  }
});
