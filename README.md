🚀 Caprae Capital: Lead Intelligence Dashboard
React • Material-UI • Chart.js • FastAPI • Celery

📚 Table of Contents
- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [About the Dashboard](#-about-the-dashboard)
- [Project Architecture](#️-project-architecture)
- [Features & Methodology](#️-features--methodology)
- [Pipeline](#-pipeline)
- [How to Run](#-how-to-run)
- [Business Value & Insights](#-business-value--insights)
- [Future Work](#-future-work)
- [Authors](#-authors)

📌 Overview
This project is an **Internship Task for Caprae Capital Partners**. It implements the frontend for a sophisticated Lead Generation Scraping Tool. Designed to integrate seamlessly with an asynchronous FastAPI and Celery backend, this dashboard allows users to manage, visualize, and extract high-value prospects.

🧠 Problem Statement
Modern sales and data teams struggle with manual lead generation, which is often:
- Time-consuming
- Error-prone
- Difficult to scale
- Lacking in intelligent prioritization

👉 **Our goal:**
Build an automated, high-performance web dashboard that triggers reliable Google Maps scraping tasks, analyzes lead quality using AI, and presents the data in an actionable, user-friendly interface.

📚 About the Dashboard
This dashboard acts as the visual command center for the Caprae Capital scraping architecture. It abandons simple CSV exports in favor of a proactive, rich interface capable of real-time pipeline management.

🔍 Key Ideas
- Uses **React + Material-UI (MUI)** for a clean, modern, and responsive aesthetic.
- Tracks headless browser scraping tasks asynchronously.
- Visualizes complex data using interactive charts (Chart.js).
- Fully decoupled from the backend for maximum modularity.

⚡ Why it matters
- Allows non-technical sales members to trigger complex backend bots.
- Instantly identifies "Hot" vs "Cold" leads without manual sorting.
- Centralizes data previously scattered across multiple platforms.

🏗️ Project Architecture

```
caprae-capital-frontend/
│
├── public/                 # Static assets and index.html
├── src/
│   ├── assets/             # Theme configurations, colors, fonts
│   ├── components/         # Reusable MUI components (MDBox, etc.)
│   ├── examples/           # Navbars, sidebars, layout wrappers
│   ├── layouts/            # Main Pages (Dashboard, Scraper, Leads, Profile)
│   ├── services/           # API interaction layer (api.js)
│   ├── App.js              # Application routing root
│   └── index.js            # React entry point
│
├── package.json            # Node dependencies and scripts
└── README.md               # This file
```

⚙️ Features & Methodology

1️⃣ Google Maps Data Scraper UI
Instead of relying on scripts, users can launch headless scraper bots directly from the interface:
- Input Business Type / Query
- Target Specific Locations
- Configure Proxy and Headless modes

2️⃣ Live Task Tracking
Tracks the status of backend Celery tasks in real-time, displaying success, failure, and progress states.

3️⃣ AI Lead Scoring Visibility
Leads are evaluated and assigned visual rating metrics:
- Scores from 0 to 100 based on data completeness and rating.
- Tier assignments: Hot, Warm, Cold.

4️⃣ Interactive Analytics
Interactive charts visualizing:
- Lead Tier Distributions
- Lead Quality Trends over time
- Automated data enrichment rates

📊 Pipeline
User Input via Dashboard 
        → API Request to FastAPI Backend 
        → Celery Task Dispatched 
        → Headless Scraping via Crawlee 
        → Dual-Database Insertion (MongoDB) 
        → Dashboard Fetches & Visualizes Results 

🚀 How to Run

🔹 1. Prerequisites
- Node.js (v16.x or newer)
- npm package manager
- The FastAPI Backend running locally on port `9000`.

🔹 2. Configure environment settings
Create a `.env` file in the root of the project to point to the backend:
```env
REACT_APP_API_URL=http://localhost:9000
```

🔹 3. Install dependencies
```bash
npm install
```

🔹 4. Start the Application
```bash
npm start
```
The application will be accessible at **http://localhost:3000**.

🧠 Business Value & Insights
- **Workflow Automation:** Replaces hours of manual Google Maps scrolling with a 1-click UI.
- **Prioritization:** The AI scoring model ensures teams call the most complete, highest-rated leads first.
- **Scalability:** The decoupled frontend/backend architecture means the UI remains perfectly responsive even while the backend is scraping thousands of leads.

📌 Future Work
- Integration of WebSocket connections for real-time live-update scraping streams.
- Advanced predictive machine learning models for conversion probability.
- One-click CRM integrations (Salesforce, HubSpot).
- Automated email outreach triggering directly from the dashboard.

🎓 Authors
- Krishnkant Sahu