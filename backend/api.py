from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.post("/")
def index():
    data = request.get_json()
    try:
        response = int(data["text"]) + 5
    except:
        response = data['text']

    return {"message": response}

if __name__ == "__main__":
    app.run(port=8000, debug=True)