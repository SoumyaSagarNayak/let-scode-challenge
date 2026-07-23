# 🇮🇳 India Global Scorecard

> **"How is India performing compared to the rest of the world?"**

**India Global Scorecard** is a production-quality development intelligence platform consolidating trusted international rankings (World Bank, UNDP, WIPO, WEF, WHO, UNESCO, Yale EPI, Transparency International) into a single interactive dashboard. Explore multi-pillar indicators, compare India side-by-side with 15+ benchmark nations, visualize historical trajectory trends, and generate AI executive summaries.

---

## 🌟 Key Features

1. **Clay Design System**: Built with modern cream canvas typography, saturated multi-color feature cards (pink, teal, lavender, peach, ochre), border-radius scales, and glassmorphism micro-interactions.
2. **10 Core Indicators**: Economy, Society, Governance, Education, Healthcare, Technology, Environment, Safety, Equality, and Digital Government.
3. **Country Comparison**: Side-by-side comparative dashboard featuring Recharts Radar & Bar charts, calculating relative strengths and headroom for reform.
4. **Interactive World Map**: Powered by `react-simple-maps` with color choropleth scales, hover tooltips, and click-to-compare drawer.
5. **AI Executive Insights**: Context-aware summary generator producing executive policy insights under 150 words (integrates OpenAI API with intelligent fallback engine).
6. **Historical Trajectory (2018 - 2025)**: Interactive line/area charts tracking year-on-year rank shifts and metric growth percentages.
7. **Instant Global Search (Cmd+K / Ctrl+K)**: Cross-category modal search with instant filtering.
8. **Local Bookmarks & Theme Persistence**: Saved metrics and Dark/Light mode persisted locally in LocalStorage.
9. **Unified Vercel Serverless Deployment**: Deploys 100% FREE on Vercel as a single repo with Vercel Serverless Functions for `/api/*` routes.

---

## 🏛️ System Architecture & Documentation

For detailed system design, data architecture schemas, API specifications, and interactive UML Mermaid diagrams, see the dedicated architecture documentation:

👉 **[Read complete system design in architecture.md](file:///d:/projects/Let%27scodedev-challenge/architecture.md)**

### Architecture Highlights:
- **Tiered Client-Server Architecture**: Decoupled React 18 SPA frontend & Express REST backend API with serverless bridge (`api/index.js`).
- **UML Diagrams Included**:
  - **High-Level System Architecture** (`graph TD` - Client, API Gateway, Controller, and Data Layers)
  - **Data Fetching Sequence Diagram** (`sequenceDiagram` - Aggregation & calculation workflow)
  - **AI Insight Fallback Sequence Diagram** (`sequenceDiagram` - OpenAI API integration with mock fallback engine)
  - **Data Model Entity-Relationship Diagram** (`erDiagram` - Categories, Indicators, Rankings, Historical Trends)
  - **Component Hierarchy & Route Mapping** (`graph TD` - Component tree & React Router mapping)
  - **Vercel Serverless Gateway Flow** (`graph TD` - Static asset & API rewrites)
- **Data Sources & Benchmark Nations**: 10 international datasets (World Bank, UNDP, WIPO, WEF, WHO, UNESCO, Yale EPI, Transparency Int.) benchmarking 16 global economies.

---

## 📁 Repository Structure

```
Let'scodedev-challenge/
├── architecture.md            # Complete architecture design & UML diagrams manual
├── DEPLOYMENT.md              # Production Vercel deployment guide
├── design.md                  # Clay UI design system & CSS tokens guide
├── README.md                  # Project overview & developer guide (This file)
├── vercel.json                # Monorepo deployment & rewrite configuration
├── package.json               # Top-level scripts & setup
├── api/                       # Vercel Serverless Function handler
│   └── index.js
├── frontend/                  # React (Vite) Single Page Application
│   ├── src/
│   │   ├── components/        # Reusable Clay UI & Chart components
│   │   ├── pages/             # 10 Application view pages
│   │   ├── hooks/             # LocalStorage & theme custom hooks
│   │   ├── services/          # Backend API client module
│   │   ├── utils/             # Formatters, constants & CSV/JSON export
│   │   ├── index.css          # Design system CSS tokens & styles
│   │   ├── App.jsx            # Router & Modal layout wrapper
│   │   └── main.jsx           # Vite entry point
│   ├── package.json
│   └── vite.config.js
└── backend/                   # Express.js REST API & JSON Datasets
    ├── data/                  # 10 JSON datasets for 16 benchmark nations
    ├── controllers/           # Scorecard & AI summary controllers
    ├── routes/                # API router definitions (/api/*)
    ├── utils/                 # Data search & calculation engine (dataHelper.js)
    ├── server.js              # Express server entry point
    └── package.json
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Start Backend Server
```bash
cd backend
npm install
npm start
```
The Express backend server will launch on `http://localhost:5000`.

### 2. Start Frontend Dev Server
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The Vite frontend server will launch on `http://localhost:5173`.

---

## ☁️ 100% Free Production Deployment (Vercel)

Simply push to GitHub and import the project into Vercel. Vercel automatically deploys:
- Static React frontend via `frontend/dist`
- Backend API endpoints via Vercel Serverless Function (`api/index.js`)

See [DEPLOYMENT.md](file:///d:/projects/Let%27scodedev-challenge/DEPLOYMENT.md) and [architecture.md](file:///d:/projects/Let%27scodedev-challenge/architecture.md) for step-by-step details.

