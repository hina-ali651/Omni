import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import json

load_dotenv(override=True)
# Also look for .env in parent directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'), override=True)

api_key = (os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY") or "").strip('"')
if not api_key:
    print("WARNING: No API key found in environment variables or .env file.")
else:
    print(f"API Key found: {api_key[:4]}...{api_key[-4:] if len(api_key) > 8 else ''}")

app = FastAPI(title="OmniSight Intelligence Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key=api_key)

class QueryRequest(BaseModel):
    query: str

SYSTEM_PROMPT = """
You are OmniSight, a high-end global intelligence engine. 
Your task is to analyze the user's query and return a structured JSON response that will be used to generate a real-time intelligence dashboard.

RESPONSE SCHEMA:
{
    "summary": "Short 2-3 sentence overview of the query context.",
    "widgets": [
        {
            "id": "unique_id",
            "type": "chart | markdown | metrics | table",
            "title": "Widget Title",
            "data": {}, // Structure data based on type
            "width": "full | half"
        }
    ],
    "sources": [
        { "title": "Source name", "url": "URL if available", "relevance": "High/Med" }
    ]
}

DATA STRUCTURES FOR WIDGETS:
- chart: { "labels": [], "datasets": [{ "label": "string", "data": [] }] }
- metrics: [ { "label": "string", "value": "string", "trend": "up/down" } ]
- table: { "headers": [], "rows": [[]] }

Ensure all data is as accurate as possible. If specific real-time data is unavailable, use the most recent historical context and explicitly state your confidence.
"""

@app.post("/api/query")
async def process_query(request: QueryRequest):
    try:
        model = genai.GenerativeModel('gemini-2.5-flash-lite', system_instruction=SYSTEM_PROMPT)
        
        response = model.generate_content(request.query)
        
        # Check if response has text
        if not response.text:
            print("Error: AI returned empty response or was blocked by safety filters.")
            raise HTTPException(status_code=500, detail="AI returned empty response")

        text = response.text
        print(f"RAW AI Response: {text}")
        
        # Clean the response to ensure it's valid JSON
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()
        
        return json.loads(text)
    except Exception as e:
        import traceback
        traceback.print_exc()
        error_msg = str(e)
        status_code = 500
        
        if "429" in error_msg or "quota" in error_msg.lower():
            status_code = 429
            error_msg = "Gemini API Quota Exceeded. Please wait a moment before trying again."
            
        raise HTTPException(status_code=status_code, detail=error_msg)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
