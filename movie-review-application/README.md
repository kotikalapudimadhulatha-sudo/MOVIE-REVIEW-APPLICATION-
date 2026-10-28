# 🎬 CineReview Hub — Movie Review Application

> **A full-stack web application celebrating Indian regional cinema (Telugu, Hindi, Tamil, Malayalam, Kannada) and world classics. Built with HTML5, CSS3, Vanilla JavaScript, Node.js, Express.js, and Supabase PostgreSQL.**

---

## 📌 1. Project Overview & Problem Statement

### 🎯 Problem Statement
Cinema enthusiasts often struggle to find dedicated, community-driven platforms that properly represent **Indian regional cinema** alongside international classics. Mainstream platforms frequently sideline regional film industries like **Tollywood (Telugu)**, **Kollywood (Tamil)**, **Mollywood (Malayalam)**, and **Sandalwood (Kannada)**, or bury them behind complex algorithms and paywalls. 

### 💡 The Solution
**CineReview Hub** is an open, intuitive, and visually captivating cinema platform designed to:
1. Provide equal prominence to Indian regional films (especially Telugu cinema) and global masterpieces.
2. Enable audiences to browse movies by language and genre, search instantly by title, and read authentic community feedback.
3. Allow moviegoers to submit star ratings (1 to 5) and written reviews without needing complicated account registrations for an MVP.
4. Calculate real-time average ratings using persistent database records.

---

## 🚀 2. Objectives & Implemented Features

### 🌟 Key Objectives
- **Simplicity & Performance:** Deliver a lightning-fast experience using Vanilla JavaScript without heavy frontend frameworks.
- **Regional Inclusivity:** Highlight Telugu, Hindi, Tamil, Malayalam, Kannada, and English cinema with rich metadata.
- **Robust Full-Stack Architecture:** Connect a modular Express.js REST API with a scalable Supabase PostgreSQL database.
- **Visual Polish:** Create a cinematic midnight-and-gold interface that looks modern on any device.

### ✨ Implemented Features
1. **Cinematic Hero & Branding:** Warm gold ambient glows, professional typography, dynamic cinema counter, and tagline.
2. **Instant Search & Multi-Filters:**
   - Real-time search by movie title with a one-click clear button.
   - Language category tabs: *All, Telugu (Tollywood), Hindi (Bollywood), Tamil (Kollywood), Malayalam (Mollywood), Kannada (Sandalwood), and English (Hollywood)*.
   - Genre dropdown filter: *Action, Drama, Thriller, Sci-Fi, Period/Epic, Mythological, Comedy, Romance, Sports*.
3. **Responsive Movie Grid & Cards:**
   - Consistent 2:3 aspect ratio cards with title, release year, language badges, and star ratings.
   - **Smart CSS Poster Fallbacks:** If an external image fails or network is offline, an elegant CSS movie reel poster displays automatically.
4. **Movie Details Modal:**
   - Full synopsis, director credits, language/genre tags, and large average star rating score.
5. **Interactive Review Form:**
   - Reviewer name input with validation.
   - Interactive 5-star selector with hover effects and descriptive labels (*1 - Poor* to *5 - Masterpiece*).
   - Review textarea with live character counter (up to 1000 characters).
6. **Community Reviews & Deletion:**
   - Displays all submitted reviews with reviewer avatar, date, star rating, and comment.
   - **Delete Review:** Delete any review with an interactive confirmation modal.
   - Real-time average rating re-calculation on both the modal and the home grid.
7. **Empty & Loading States:**
   - Smooth animated spinner while catalog loads.
   - Friendly empty state with a "Clear All Filters" button when no results match.
8. **Dual-Mode Backend Resilience:**
   - Works immediately with built-in demo in-memory storage.
   - Seamlessly upgrades to **live Supabase PostgreSQL** when credentials are added in `.env`.

---

## 🛠️ 3. Technologies Used

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | Semantic markup, CSS Custom Properties, Flexbox, CSS Grid, Fetch API |
| **Backend** | Node.js & Express.js | Modular REST API routing, CORS, dotenv, JSON middleware |
| **Database** | Supabase PostgreSQL | Relational schema, foreign keys, SQL View for rating aggregation |
| **Version Control** | Git & GitHub | Clean repository structure and ignored environment files |

*No heavy frontend frameworks (React, Angular, Vue), TypeScript, or NoSQL databases were used, keeping the project lightweight and transparent.*

---

## 📂 4. Exact Folder Structure

```text
movie-review-application/
├── frontend/
│   ├── index.html       # Single-page application HTML5 layout
│   ├── styles.css       # Midnight & gold cinema stylesheet
│   └── app.js           # Client-side state, Fetch API, and DOM logic
├── backend/
│   ├── server.js        # Express.js entry point & static file hosting
│   ├── supabase.js      # Supabase client configuration & credentials checker
│   ├── demoData.js      # Curated Indian & English movies demo dataset
│   ├── routes/
│   │   ├── movies.js    # GET /api/movies & GET /api/movies/:id
│   │   └── reviews.js   # GET/POST /api/movies/:id/reviews & DELETE /api/reviews/:id
│   ├── package.json     # Node.js dependencies and run scripts
│   ├── .env             # Active environment file (ignored by Git)
│   ├── .env.example     # Environment template for reviewers & collaborators
│   └── .gitignore       # Backend-specific ignore rules
├── database/
│   └── schema.sql       # PostgreSQL schema, foreign keys, view, and seed data
├── .gitignore           # Root Git ignore configuration
└── README.md            # Comprehensive project documentation
```

---

## ⚙️ 5. Prerequisites

Before running the application, make sure you have the following installed on your computer:
1. **Node.js** (v16 or higher) — [Download Node.js](https://nodejs.org/)
2. **Git** (for version control and GitHub upload) — [Download Git](https://git-scm.com/)
3. A modern web browser (Google Chrome, Microsoft Edge, Firefox, or Opera).

---

## 📥 6. Step-by-Step Installation Commands

Open PowerShell or Command Prompt in the project folder and run:

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install required Node.js dependencies
npm install
```

This installs `express`, `cors`, `dotenv`, and `@supabase/supabase-js`.

---

## 🗄️ 7. Supabase Project Creation & SQL Setup

To connect CineReview Hub to a live PostgreSQL database on Supabase:

### Step 1: Create a Free Supabase Account & Project
1. Go to [https://supabase.com](https://supabase.com) and sign in (using GitHub or email).
2. Click **New Project**.
3. Enter a project name (e.g., `CineReview-Hub`).
4. Enter a strong database password and select the region nearest to you (e.g., *Central India (Mumbai)*).
5. Click **Create new project** and wait 1-2 minutes for provisioning.

### Step 2: Run the SQL Schema
1. In your Supabase Dashboard, click on **SQL Editor** in the left navigation menu.
2. Click **+ New query**.
3. Open the file `database/schema.sql` from this project, copy the entire SQL code, and paste it into the Supabase SQL editor.
4. Click the green **RUN** button (or press `Ctrl + Enter`).
5. You will see `Success. No rows returned`. Your `movies` table, `reviews` table, `movie_ratings_view`, indexes, and seed movies are now live!

### Step 3: Get Your API Credentials
1. In your Supabase Dashboard, click on the **Project Settings** (gear icon) in the bottom-left.
2. Select **API** from the sidebar menu.
3. Locate:
   - **Project URL:** e.g. `https://your-id.supabase.co`
   - **Project API Keys:** Find `service_role` (click *Reveal* to copy the secret key).

---

## 🔐 8. Environment Variable Configuration

1. Inside the `backend/` folder, find the `.env` file (or copy `.env.example` to `.env`):
   ```bash
   cp .env.example .env
   ```
2. Open `backend/.env` in any text editor and fill in your values:

```env
PORT=3000
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your_actual_key
```

> **Note:** If you leave `SUPABASE_URL` blank, the app runs in **Demo In-Memory Mode** automatically. You can test and demonstrate the complete application immediately without database setup errors!

---

## ▶️ 9. Commands to Start the Server

From the `backend/` folder, start the application:

```bash
# Start the server
npm start
```

For automatic server reload during development:
```bash
npm run dev
```

### Accessing the Application:
- 🌐 **Web Interface:** Open [http://localhost:3000](http://localhost:3000) in your browser.
- 🩺 **Health Endpoint:** [http://localhost:3000/api/health](http://localhost:3000/api/health)
- 🍿 **Movies API:** [http://localhost:3000/api/movies](http://localhost:3000/api/movies)

---

## 📡 10. REST API Documentation

| Method | Endpoint | Description | Request Body / Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Check server and database status | *None* |
| `GET` | `/api/movies` | List movies with computed average ratings | Query params: `?search=rrr&language=Telugu&genre=Action` |
| `GET` | `/api/movies/:id` | Get details and rating for one movie | Route param: `:id` (UUID or ID string) |
| `GET` | `/api/movies/:id/reviews` | Retrieve all reviews for a movie | Route param: `:id` |
| `POST` | `/api/movies/:id/reviews` | Add a validated review for a movie | `{ "reviewer_name": "Arjun", "rating": 5, "review_text": "Phenomenal!" }` |
| `DELETE` | `/api/reviews/:id` | Delete a review by review ID | Route param: `:id` |

### Sample POST `/api/movies/:id/reviews` Request:
```json
{
  "reviewer_name": "Divya Sharma",
  "rating": 5,
  "review_text": "Rajamouli has outdone himself. The interval block gave goosebumps!"
}
```

### Sample Response:
```json
{
  "message": "Review added successfully",
  "data": {
    "id": "11111111-2222-3333-4444-555555555555",
    "movie_id": "11111111-1111-1111-1111-111111111101",
    "reviewer_name": "Divya Sharma",
    "rating": 5,
    "review_text": "Rajamouli has outdone himself. The interval block gave goosebumps!",
    "created_at": "2026-10-27T14:15:00.000Z"
  }
}
```

---

## 🧪 11. Testing Instructions

### 1. Verification of UI Features
1. **Search:** Type `RRR` or `Pushpa` in the hero search box. Confirm instant card filtering.
2. **Language Filters:** Click on **Telugu (Tollywood)**. Verify that only Telugu movies are displayed. Click **All Cinema** to reset.
3. **Genre Filters:** Select **Sci-Fi** from the dropdown. Verify `Kalki 2898 AD` and `Interstellar` are displayed.
4. **Modal View:** Click on any movie card. Check that the modal opens with title, director, tags, and reviews.
5. **Add a Review:** In the modal, fill in your name, select 5 stars (click the 5th star), write a comment, and click **Submit Review**. Confirm that:
   - A success toast notification appears.
   - The review appears at the top of the community reviews list.
   - The average star rating updates automatically.
6. **Delete a Review:** Click the **🗑️ Delete** button on your review. Confirm the prompt dialog appears. Click **Yes, Delete**. Confirm the review is removed.

### 2. Verification of REST Endpoints via PowerShell / cURL
```powershell
# Test health endpoint
curl http://localhost:3000/api/health

# Test movies list
curl http://localhost:3000/api/movies?language=Telugu
```

---

## 🐙 12. GitHub Upload Instructions

Follow these exact steps to push this project to your GitHub profile:

### Step 1: Initialize Git Repository
In the root directory of the project (`movie-review-application`):
```bash
git init
```

### Step 2: Stage and Commit All Files
```bash
git add .
git commit -m "feat: complete CineReview Hub movie review application MVP"
```

### Step 3: Create a New Repository on GitHub
1. Go to [https://github.com/new](https://github.com/new).
2. Set the repository name to `movie-review-application` (or `CineReview-Hub`).
3. Set visibility to **Public**.
4. Leave "Add a README file" **unchecked** (we already have a complete README).
5. Click **Create repository**.

### Step 4: Link and Push to GitHub
```bash
# Rename default branch to main
git branch -M main

# Link remote origin (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/movie-review-application.git

# Push the code
git push -u origin main
```

---

## 🛡️ 13. Security & Safeguards

1. **Privileged Keys Protected:** The Supabase Service Role key is strictly loaded on the backend using `process.env`. It is **never exposed** in client-side HTML or JavaScript files.
2. **Git Secrets Protection:** `.gitignore` excludes `.env`, `node_modules`, and credentials from being committed to public repositories.
3. **XSS Prevention:** All user-submitted review strings and names are sanitized before storage and escaped when rendered in the DOM (`escapeHtml`).
4. **Input Validation:** Ratings are constrained to integers `1 <= rating <= 5`. Reviewer names and review text lengths are strictly validated on both client and server.
5. **Confirmation Safeguards:** Deletions require explicit user confirmation to prevent accidental loss of reviews.

---

## 🔮 14. Current Limitations & Future Improvements

### Current Limitations (MVP Scope)
- Reviews do not require user authentication (login/signup), meaning reviews are anonymous and identified by the submitted name.
- Fixed curated movie catalog rather than a live 100,000+ movie database.

### Roadmap & Future Enhancements
- 👤 **User Authentication:** Supabase Auth for registered profiles, avatars, and verified critic badges.
- 🎬 **User Movie Submissions:** Allow authenticated users to suggest and add new movies.
- 💬 **Review Interactions:** Upvote/helpful buttons and comment replies on reviews.
- 🌓 **Theme Customization:** Toggle between Midnight Charcoal, Deep Blue, and High-Contrast modes.

---

## 👨‍💻 Author & Academic Project Notes
- **Project Name:** CineReview Hub — Movie Review Application
- **Course:** B.Tech Computer Science & Engineering (Year 1)
- **License:** MIT License — Open for academic demonstration and learning.

