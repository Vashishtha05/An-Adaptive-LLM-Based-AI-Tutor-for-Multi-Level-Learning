import logging
import os
from typing import Generator

from dotenv import load_dotenv
from flask import Flask, Response, jsonify, render_template, request
from openai import OpenAI

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("adaptive-ai-tutor")

EXPLANATION_LEVELS = {
    1: "like I'm 5 years old",
    2: "like I'm 10 years old",
    3: "like a high school student",
    4: "like a college student",
    5: "like an expert in the field",
}


def create_openrouter_client() -> OpenAI:
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise RuntimeError(
            "Missing OPENROUTER_API_KEY in environment. Add it to your .env file."
        )

    return OpenAI(
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
    )


def build_system_prompt(level_value: int) -> str:
    level_description = EXPLANATION_LEVELS.get(level_value, "clearly and concisely")
    return (
        "You are a professional and patient AI tutor. "
        f"Explain concepts {level_description}. "
        "Use clean structure, practical examples, and keep the answer accurate."
    )


def stream_tutor_response(client: OpenAI, question: str, level_value: int) -> Generator[str, None, None]:
    system_prompt = build_system_prompt(level_value)

    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question},
        ],
        temperature=0.7,
        stream=True,
    )

    for chunk in stream:
        delta = chunk.choices[0].delta
        if delta and delta.content:
            yield delta.content


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY", "change-me-in-production")

    @app.get("/")
    def home():
        return render_template("index.html", explanation_levels=EXPLANATION_LEVELS)

    @app.get("/health")
    def health():
        return jsonify({"status": "ok"}), 200

    @app.post("/api/ask")
    def ask_tutor():
        payload = request.get_json(silent=True) or {}
        question = (payload.get("question") or "").strip()
        level = int(payload.get("level", 3))

        if not question:
            return jsonify({"error": "Question is required."}), 400

        try:
            client = create_openrouter_client()
        except RuntimeError as exc:
            logger.exception("Configuration error")
            return jsonify({"error": str(exc)}), 500

        def generate() -> Generator[str, None, None]:
            try:
                for text in stream_tutor_response(client, question, level):
                    yield text
            except Exception as exc:
                logger.exception("Streaming failed")
                yield f"\n\n[Error] Unable to generate response: {exc}"

        return Response(generate(), mimetype="text/plain")

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
