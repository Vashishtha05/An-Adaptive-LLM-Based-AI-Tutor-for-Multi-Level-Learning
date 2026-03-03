# Adaptive AI Tutor (Flask + OpenRouter)

This project includes a professional Flask web app version of your adaptive AI tutor and your original notebook.

## Included
- `app.py` - Flask backend with streaming tutor API
- `templates/` and `static/` - polished frontend UI
- `requirements.txt` - Python dependencies
- `.env.example` - environment variable template
- `An Adaptive LLM-Based AI Tutor with Gradio Interface for Multi-Level Learning.ipynb` - original notebook

## Quick Start
1. Create and activate a virtual environment.
2. Install dependencies:
	- `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and set your key:
	- `OPENROUTER_API_KEY=...`
4. Run the app:
	- `python app.py`
5. Open:
	- `http://127.0.0.1:5000`

## Environment Variables
- `OPENROUTER_API_KEY` (required)
- `FLASK_SECRET_KEY` (recommended)

## GitHub Safety
- `.env`, `.gradio/`, and `.ipynb_checkpoints/` are excluded via `.gitignore`.
