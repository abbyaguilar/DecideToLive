# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS

from schema import SCHEMA
from scoring import evaluate

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.get("/")
def root():
    return jsonify({
        "ok": True,
        "service": "Decide to Live API",
        "endpoints": ["/api/health", "/api/schema", "/api/evaluate"]
    })

@app.get("/api/health")
def health():
    return {"ok": True}

@app.get("/api/schema")
def get_schema():
    return jsonify(SCHEMA)

@app.post("/api/evaluate")
def post_evaluate():
    payload = request.get_json(silent=True) or {}
    answers = payload.get("answers", {})

    if not isinstance(answers, dict):
        return jsonify({"error": "answers must be an object"}), 400

    return jsonify(evaluate(answers))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
