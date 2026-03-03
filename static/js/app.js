const form = document.getElementById("tutorForm");
const questionInput = document.getElementById("question");
const levelInput = document.getElementById("level");
const levelLabel = document.getElementById("levelLabel");
const responseBox = document.getElementById("response");
const clearBtn = document.getElementById("clearBtn");
const askBtn = document.getElementById("askBtn");
const statusPill = document.getElementById("status");

let markdownBuffer = "";

function setStatus(text, mode = "idle") {
  statusPill.textContent = text;
  statusPill.classList.remove("running", "done");
  if (mode === "running") statusPill.classList.add("running");
  if (mode === "done") statusPill.classList.add("done");
}

function renderResponse(markdownText) {
  if (!markdownText.trim()) {
    responseBox.textContent = "Your answer will appear here...";
    return;
  }
  responseBox.innerHTML = marked.parse(markdownText);
  responseBox.scrollTop = responseBox.scrollHeight;
}

levelInput.addEventListener("input", () => {
  levelLabel.textContent = levelInput.value;
});

clearBtn.addEventListener("click", () => {
  questionInput.value = "";
  markdownBuffer = "";
  renderResponse(markdownBuffer);
  setStatus("Idle");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = questionInput.value.trim();
  const level = Number(levelInput.value);

  if (!question) {
    setStatus("Enter a question first");
    return;
  }

  askBtn.disabled = true;
  clearBtn.disabled = true;
  markdownBuffer = "";
  renderResponse(markdownBuffer);
  setStatus("Generating...", "running");

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, level }),
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
    markdownBuffer += `\n\n**Error:** ${error.message}`;
    renderResponse(markdownBuffer);
    setStatus("Failed");
  } finally {
    askBtn.disabled = false;
    clearBtn.disabled = false;
  }
});
