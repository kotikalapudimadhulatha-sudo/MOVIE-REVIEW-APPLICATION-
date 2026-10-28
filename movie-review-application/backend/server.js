// backend/server.js
// CineReview Hub — Express.js Server & Application Entry Point

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { isConfigured, getSupabaseUrl } = require('./supabase');
const moviesRouter = require('./routes/movies');
const reviewsRouter = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// API Health Check Endpoint
app.get('/api/health', (req, res) => {
  const supabaseActive = isConfigured();
  res.json({
    status: 'ok',
    app: 'CineReview Hub — Movie Review Application',
    uptime_seconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      connected: supabaseActive,
      type: supabaseActive ? 'Supabase PostgreSQL' : 'Demo In-Memory Fallback',
      url: supabaseActive ? getSupabaseUrl() : 'Not configured (using demo data)'
    },
    version: '1.0.0'
  });
});

// Mount REST API Routes
app.use('/api/movies', moviesRouter);
app.use('/api', reviewsRouter);

// Fallback to serve index.html for client-side navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log('========================================================');
  console.log('🎬 CineReview Hub — Server is Running!');
  console.log('========================================================');
  console.log(`🌐 Application URL:  http://localhost:${PORT}`);
  console.log(`🩺 Health Status:    http://localhost:${PORT}/api/health`);
  console.log(`🍿 Movies API:       http://localhost:${PORT}/api/movies`);
  console.log(`🗄️  Database Status:  ${isConfigured() ? 'Supabase PostgreSQL (Connected)' : 'Demo Fallback Mode (Ready for Supabase)'}`);
  console.log('========================================================');
});

