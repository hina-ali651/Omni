content = """# OmniSight - AI-Powered Intelligence Dashboard

> Ask anything. Get instant intelligence.

OmniSight is a full-stack AI web application that transforms any natural language query into a rich, structured intelligence report complete with charts, metrics, tables, and summaries powered by Google Gemini.

---

## What is OmniSight?

OmniSight acts as your personal AI intelligence analyst. Type a query like "Global EV adoption trends 2024" or "Pakistan inflation rate vs GDP" and it instantly generates a dynamic dashboard with data visualizations, key metrics, and source references.

Built for researchers, analysts, students, journalists, and decision-makers who need fast, structured intelligence from AI.

---

## Key Features

- **Agentic AI Core** - Google Gemini 2.5 Flash understands queries and returns structured intelligence
- **Dynamic Dashboard Widgets** - Auto-generates Charts, Metrics, Tables, and Markdown cards
- **Real-time Response** - Instant AI-powered analysis with no page reload
- **Any Topic, Any Domain** - Finance, climate, health, agriculture, geopolitics, and more
- **Structured JSON Intelligence** - Backend returns clean, schema-validated JSON
- **Source References** - AI provides citations with relevance scores

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (TypeScript) |
| Backend | FastAPI (Python) |
| AI Model | Google Gemini 2.5 Flash Lite |
| Styling | Tailwind CSS |
| API | REST (JSON) |

---

## Project Structure

```
omni/
|-- backend/
|   |-- main.py              # FastAPI server + Gemini AI
|   |-- requirements.txt     # Python dependencies
|-- frontend/
|   |-- src/
|   |   |-- app/page.tsx     # Main query interface
|   |   |-- components/
|   |   |   |-- dashboard/   # Dashboard components
|   |   |   |-- widgets/     # Chart, Metric, Table widgets
|   |   |-- types/           # TypeScript types
|-- README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Python 3.10+
- Google Gemini API Key: https://aistudio.google.com/app/apikey

---

### 1. Clone the Repository

```bash
git clone https://github.com/hina-ali651/Omni.git
cd omni
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\\Scripts\\activate
pip install -r requirements.txt
echo GOOGLE_API_KEY=your_api_key_here > .env
python main.py
```

Backend runs at: http://localhost:8000

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

---

## API Reference

### POST /api/query

**Request Body:**
```json
{ "query": "Global renewable energy trends 2024" }
```

**Response:**
```json
{
  "summary": "Short overview of the topic...",
  "widgets": [
    {
      "id": "widget_1",
      "type": "chart or metrics or table or markdown",
      "title": "Widget Title",
      "data": {},
      "width": "full or half"
    }
  ],
  "sources": [
    { "title": "Source Name", "url": "https://...", "relevance": "High" }
  ]
}
```

---

## Use Cases

- **Financial Analysis** - Market trends, stock comparisons, economic indicators
- **Climate and Environment** - Carbon emissions, renewable energy stats
- **Public Health** - Disease outbreaks, vaccination rates, health metrics
- **Agriculture** - Crop yield data, food security analysis
- **Urban Planning** - Infrastructure, population density, city data
- **Geopolitics** - Country comparisons, trade data, conflict zones

---

## Deployment

- **Backend**: Google Cloud Run
- **Frontend**: Vercel

---

## Author

**Hina Ali** - AI-Powered Full Stack Developer

- GitHub: https://github.com/hina-ali651

---

## License

MIT License

---

> Built with love and powered by Google Gemini AI
"""

with open(r'c:\\Users\\kc\\Desktop\\omni\\README.md', 'w', encoding='utf-8', newline='\\n') as f:
    f.write(content)

print("README.md written successfully!")
