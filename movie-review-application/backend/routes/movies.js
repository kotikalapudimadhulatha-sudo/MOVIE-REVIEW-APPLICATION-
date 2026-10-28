// backend/routes/movies.js
// REST API Routes for Movies: Listing, Filtering, Search, and Single Details

const express = require('express');
const router = express.Router();
const { supabase, isConfigured } = require('../supabase');
const { demoMovies, demoReviews, getMovieRatingStats } = require('../demoData');

/**
 * GET /api/movies
 * List all movies with optional filters: search, language, genre
 * Includes calculated average_rating and review_count
 */
router.get('/', async (req, res) => {
  try {
    const { search, language, genre } = req.query;

    // --- CASE 1: Supabase Database Connected ---
    if (isConfigured() && supabase) {
      // First attempt to query the pre-calculated view
      let query = supabase.from('movie_ratings_view').select('*');

      if (language && language.toLowerCase() !== 'all') {
        query = query.ilike('language', language);
      }

      if (genre && genre.toLowerCase() !== 'all') {
        query = query.ilike('genre', `%${genre}%`);
      }

      if (search && search.trim() !== '') {
        query = query.ilike('title', `%${search.trim()}%`);
      }

      const { data, error } = await query.order('release_year', { ascending: false });

      if (!error && data) {
        return res.json({
          source: 'supabase',
          count: data.length,
          data
        });
      }

      // If view query failed (e.g. view not created yet), query 'movies' table directly
      console.warn('Notice: movie_ratings_view not accessible, querying movies table directly.');
      let fallbackQuery = supabase.from('movies').select('*');

      if (language && language.toLowerCase() !== 'all') {
        fallbackQuery = fallbackQuery.ilike('language', language);
      }
      if (genre && genre.toLowerCase() !== 'all') {
        fallbackQuery = fallbackQuery.ilike('genre', `%${genre}%`);
      }
      if (search && search.trim() !== '') {
        fallbackQuery = fallbackQuery.ilike('title', `%${search.trim()}%`);
      }

      const { data: moviesData, error: movieError } = await fallbackQuery.order('release_year', { ascending: false });

      if (movieError) {
        throw movieError;
      }

      // Fetch all reviews to compute ratings
      const { data: allReviews } = await supabase.from('reviews').select('movie_id, rating');
      const enrichedMovies = (moviesData || []).map(m => {
        const revs = (allReviews || []).filter(r => r.movie_id === m.id);
        const count = revs.length;
        const avg = count > 0 ? (revs.reduce((a, b) => a + Number(b.rating), 0) / count).toFixed(1) : 0;
        return {
          ...m,
          average_rating: parseFloat(avg),
          review_count: count
        };
      });

      return res.json({
        source: 'supabase',
        count: enrichedMovies.length,
        data: enrichedMovies
      });
    }

    // --- CASE 2: Demo / In-Memory Fallback Mode ---
    let results = [...demoMovies];

    // Filter by language
    if (language && language.trim().toLowerCase() !== 'all') {
      const lang = language.trim().toLowerCase();
      results = results.filter(m => (m.language || '').toLowerCase() === lang);
    }

    // Filter by genre
    if (genre && genre.trim().toLowerCase() !== 'all') {
      const g = genre.trim().toLowerCase();
      results = results.filter(m => (m.genre || '').toLowerCase().includes(g));
    }

    // Filter by search query (supports partial and case-insensitive searches across title, director, and cast/description)
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      results = results.filter(m => {
        const title = (m.title || '').toLowerCase();
        const director = (m.director || '').toLowerCase();
        const description = (m.description || '').toLowerCase();
        return title.includes(q) || director.includes(q) || description.includes(q);
      });
    }

    // Attach dynamic ratings and review counts from current reviews
    const enrichedResults = results.map(m => {
      const stats = getMovieRatingStats(m.id, demoReviews);
      return {
        ...m,
        average_rating: stats.average_rating,
        review_count: stats.review_count
      };
    });

    return res.json({
      source: 'demo_memory',
      count: enrichedResults.length,
      data: enrichedResults
    });

  } catch (error) {
    console.error('Error fetching movies:', error);
    return res.status(500).json({
      error: 'Failed to retrieve movies',
      message: error.message
    });
  }
});

/**
 * GET /api/movies/:id
 * Retrieve a single movie by its ID, with calculated average rating
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // --- CASE 1: Supabase Connected ---
    if (isConfigured() && supabase) {
      const { data: movie, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      // Calculate rating
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('movie_id', id);

      const revCount = reviews ? reviews.length : 0;
      const avg = revCount > 0 
        ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / revCount).toFixed(1)
        : 0;

      return res.json({
        ...movie,
        average_rating: parseFloat(avg),
        review_count: revCount
      });
    }

    // --- CASE 2: Demo / In-Memory Fallback Mode ---
    const movie = demoMovies.find(m => m.id === id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const stats = getMovieRatingStats(movie.id, demoReviews);

    return res.json({
      ...movie,
      average_rating: stats.average_rating,
      review_count: stats.review_count
    });

  } catch (error) {
    console.error('Error fetching movie details:', error);
    return res.status(500).json({
      error: 'Failed to retrieve movie details',
      message: error.message
    });
  }
});

module.exports = router;

