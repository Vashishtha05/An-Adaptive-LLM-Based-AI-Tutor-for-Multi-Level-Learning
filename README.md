# 🎓 AI Tutor with MCP & OpenAI Agents SDK

<p align="center">
  <img src="https://img.shields.io/badge/MCP-Gradio-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/AI%20Agent-OpenAI%20Agents%20SDK-black?style=for-the-badge">
  <img src="https://img.shields.io/badge/GenAI-Adaptive%20Learning-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Python-Jupyter-yellow?style=for-the-badge">
</p>

<p align="center">
  An AI-powered tutoring system that uses the Model Context Protocol (MCP) and OpenAI Agents SDK to provide tool-enabled personalized learning.
</p>

---

## 📌 Overview

AI Tutor with MCP is a notebook-based intelligent tutoring system that demonstrates how learning capabilities can be exposed as reusable tools through the **Model Context Protocol (MCP)** and consumed by an AI agent using the **OpenAI Agents SDK**.

The system:

* Exposes learning functions through a Gradio MCP server
* Allows AI agents to discover tools dynamically
* Connects to MCP tools using Server-Sent Events (SSE)
* Maintains a conversational tutoring loop
* Streams explanations, summaries, flashcards, and quizzes

The project contains both the MCP server implementation and the AI tutor client notebook.

---

## ✨ Features

* 🎯 Multi-level concept explanations
* 💬 Conversational AI tutoring
* 🧠 MCP-based tool discovery
* 🔌 Server-Sent Events (SSE) communication
* 📚 Text summarization
* 🗂️ Automatic flashcard generation
* 📝 Multiple-choice quiz generation
* ⚡ Streaming AI responses
* 🌐 Gradio-based MCP server
* 🤖 OpenAI Agents SDK integration

---

## 🛠️ Available Learning Tools

| Tool                | Description                                      | Inputs                            |
| ------------------- | ------------------------------------------------ | --------------------------------- |
| Explain Concept     | Explains concepts at different learning levels   | `question`, `level`               |
| Summarize Text      | Produces a condensed version of supplied text    | `text`, `compression_ratio`       |
| Generate Flashcards | Creates question-and-answer flashcards           | `topic`, `num_cards`              |
| Quiz Me             | Generates a multiple-choice quiz with answer key | `topic`, `level`, `num_questions` |

The client notebook also contains an optional implementation for explaining concepts in a selected language.

---

## ⚙️ Tech Stack

| Technology             | Usage                       |
| ---------------------- | --------------------------- |
| Python                 | Core development            |
| Gradio                 | MCP server                  |
| Model Context Protocol | Tool exposure and discovery |
| OpenAI Agents SDK      | AI agent orchestration      |
| OpenAI-Compatible API  | LLM inference               |
| Server-Sent Events     | MCP communication           |
| Jupyter Notebook       | Development and execution   |
| python-dotenv          | Environment management      |

---

## 🔄 Project Flow

```text
┌──────────────────────────────┐
│       MCP Server Notebook    │
│       MCP Server.ipynb       │
└──────────────┬───────────────┘
               │
               │ Gradio MCP Server
               │ SSE
               ▼
┌──────────────────────────────┐
│ /gradio_api/mcp/sse          │
└──────────────┬───────────────┘
               │
               │ MCPServerSse
               ▼
┌──────────────────────────────┐
│      AI Tutor Notebook       │
│ Build an AI Tutor Using MCP  │
│ and OpenAI Agents SDK.ipynb  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ OpenAI Agent + MCP Tools     │
└──────────────────────────────┘
```

---

## 🚀 Getting Started

### 1️⃣ Requirements

Make sure you have:

* Python 3.10 or newer
* Jupyter Notebook or JupyterLab
* An OpenAI-compatible API key
* Internet access for package installation and model requests

### 2️⃣ Install Dependencies

```bash
pip install --upgrade openai-agents
pip install "gradio[mcp]" openai python-dotenv requests httpx pillow
```

### 3️⃣ Configure Environment

Create a `.env` file in the project directory:

```env
OPENROUTER_API_KEY=your-api-key
```

The MCP server uses an OpenRouter-compatible API configuration. Set the appropriate model and API endpoint before running the server.

---

## ▶️ How to Run

### Step 1 — Start the MCP Server

Open:

```text
MCP Server.ipynb
```

Run the notebook cells in order.

The final cell launches the Gradio MCP server:

```python
build_demo().launch(
    server_name="0.0.0.0",
    mcp_server=True
)
```

The MCP SSE endpoint will be available at:

```text
http://localhost:7860/gradio_api/mcp/sse
```

Keep the server notebook running.

---

### Step 2 — Start the AI Tutor

Open:

```text
Build an AI Tutor Using MCP and OpenAI Agents SDK.ipynb
```

Run the setup cells.

The client connects to the MCP server using:

```python
MCP_BASE = "http://localhost:7860/gradio_api/mcp/sse"
```

Run the schema-fetching cells to discover the available learning tools.

Then run the agent cells to start the conversational tutor.

Example request:

```text
Explain recursion like I am 10 years old.
```

The agent can select and use the appropriate MCP learning tool to generate the response.

Type:

```text
exit
```

or

```text
quit
```

to stop the conversation.

---

## 🧠 How It Works

1. The **Gradio MCP server** exposes Python learning functions as tools.
2. The server publishes an MCP schema describing the available tools.
3. The AI Tutor connects to the server through the MCP SSE endpoint.
4. The **OpenAI Agents SDK** discovers the available tools.
5. The user interacts with the conversational tutor.
6. The agent invokes the appropriate MCP tool.
7. Generated explanations, summaries, flashcards, or quizzes are streamed back to the user.

---

## 🔍 MCP Schema

The MCP schema can be accessed through:

```text
http://localhost:7860/gradio_api/mcp/schema
```

The schema describes:

* Available tools
* Tool inputs
* Tool purposes
* Parameters required by each tool

This allows MCP clients and agents to discover available functionality without requiring a separate hardcoded integration for every learning function.

---

## 📂 Project Structure

```text
├── MCP Server.ipynb
├── Build an AI Tutor Using MCP and OpenAI Agents SDK.ipynb
├── .env
└── README.md
```
---

## 🐛 Troubleshooting

### Connection Refused

Make sure the MCP server notebook is running and that port `7860` is available.

### Schema Request Fails

Verify that the client URL matches:

```text
http://localhost:7860/gradio_api/mcp/sse
```

and that Gradio MCP support is enabled.

### Authentication Error

Check that the API key is available through the expected environment variable and that the selected model is supported by your provider.

### Agent Cannot Find Tools

Reconnect the MCP server and rerun the agent after confirming that the MCP schema loads correctly.

---

## 🔮 Future Extensions

* 🌍 Add multilingual tutoring tools
* 📈 Add learner progress tracking
* 📚 Add citation and source retrieval
* 🗃️ Return structured JSON for flashcards and quizzes
* 🔐 Add authentication for remote MCP deployments
* 🎯 Add personalized learning paths
* 📊 Track learner performance across sessions

---

## 👨‍💻 Author

**Vashishtha Verma**

* 🤖 Machine Learning & Generative AI
* 🧠 Agentic AI Systems
* 💻 Software Engineering & DSA
