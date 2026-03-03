# 🎓 Adaptive AI Tutor — Flask LLM Web App

<p align="center">
  <img src="https://img.shields.io/badge/LLM-OpenRouter-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Flask-Web%20App-black?style=for-the-badge">
  <img src="https://img.shields.io/badge/GenAI-Adaptive%20Learning-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Python-Education-yellow?style=for-the-badge">
</p>

<p align="center">
  An adaptive AI-powered tutoring system built with Flask and OpenRouter for multi-level personalized learning.
</p>

---

## 📌 Overview

Adaptive AI Tutor is a web-based educational assistant that dynamically adjusts explanations based on learner level.

The system:

- Provides level-based explanations  
- Streams responses in real time  
- Maintains conversational context  
- Delivers a polished web interface using Flask  

Both the production-ready Flask app and the original notebook implementation are included.

---

## ✨ Features

- 🎯 Multi-level adaptive learning (Beginner → Advanced)  
- 💬 Real-time streaming tutor responses  
- 🧠 Context-aware conversational memory  
- 🌐 Flask-based web interface  
- 📘 Original research notebook included  

---

## ⚙️ Tech Stack

| Technology | Usage |
|------------|--------|
| Python | Core development |
| Flask | Web framework |
| OpenRouter API | LLM inference |
| HTML/CSS | Frontend UI |
| dotenv | Environment management |

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 2️⃣ Configure Environment

Create a `.env` file:

```env
OPENROUTER_API_KEY=your-api-key
FLASK_SECRET_KEY=your-secret-key
```

### 3️⃣ Run Application

```bash
python app.py
```

Open in browser:

```
http://127.0.0.1:5000
```

---

## 🧠 How It Works

1. User selects learning level  
2. Query is sent to LLM with adaptive system prompt  
3. Response is streamed back in real time  
4. Context is maintained across interactions  

---

## 📂 Project Structure

```
├── app.py
├── templates/
├── static/
├── requirements.txt
├── .env.example
└── Adaptive_AI_Tutor.ipynb
```
## 👨‍💻 Author 
**Vashishtha Verma** 
* 🤖 Machine Learning & Generative AI
* 🧠 Agentic AI Systems
* 💻 Software Engineering & DSA
