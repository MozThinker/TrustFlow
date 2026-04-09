# TrustFlow - AI-Driven Alternative Credit Scorer

## Key Features

- **Hybrid AI Architecture**: Deterministic scoring engine for reliability + Gemini 3 Flash for natural language insights.
- **Explainable AI**: "Why this score?" panel providing clear, data-driven narratives.
- **CSV Upload**: Support for custom transaction history parsing via PapaParse.
- **Financial Coaching**: Actionable, AI-personalized tips to improve financial health.
- **Impact Simulation**: Visual comparison of interest costs between informal lenders and TrustFlow.
- **Modern Fintech UI**: Glassmorphism, premium typography (Outfit & Inter), and smooth Motion animations.

## Stage 1: Project Architecture & Stack

### Tech Stack
- **Frontend**: React 19 (Functional Components, Hooks)
- **Styling**: Tailwind CSS 4 (Utility-first, responsive)
- **Animations**: Motion (Smooth transitions, micro-interactions)
- **Charts**: Recharts (Data visualization)
- **Icons**: Lucide-React
- **State Management**: React Context / Hooks (Simple & effective for a prototype)

### Folder Structure
```text
/src
  /components        # Reusable UI components
    /dashboard       # Dashboard-specific components
    /layout          # Navbar, Footer, etc.
    /ui              # Base UI elements
  /lib               # Core logic and utilities
    mockData.ts      # Profile generation
    scoringEngine.ts # The "AI" logic
    utils.ts         # Formatting and helpers
  /types             # TypeScript interfaces
  App.tsx            # Main application entry
  index.css          # Global styles & Tailwind
  main.tsx           # React mounting
```

## Stage 2: Mock Data & Scoring Logic
(Implemented in `src/lib/mockData.ts` and `src/lib/scoringEngine.ts`)

## Stage 3 & 4: UI Implementation & Data Connection
(Implemented across `src/components/*` and `src/App.tsx`)

## Stage 5: Visual Design Improvements
(Applied via Tailwind classes and Motion animations)

## Stage 6: Local Setup Instructions

To run TrustFlow locally on your machine, follow these steps:

1. **Clone the repository** (or copy the files into a new directory).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open your browser** and navigate to `http://localhost:3000`.

### Key Commands
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs TypeScript type checking.

### Hackathon Demo Tips
- Use **Maria's profile** to demonstrate a "Perfect" score and low-risk lending.
- Use **Ana's profile** to show how the system identifies high risk and provides coaching tips to improve.
- Highlight the **Impact Simulation** to emphasize the social mission of the product.
