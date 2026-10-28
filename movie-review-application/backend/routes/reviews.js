// backend/routes/reviews.js
// REST API Routes for Reviews: Listing, Adding, and Deleting Reviews

const express = require('express');
const router = express.Router();
const { supabase, isConfigured } = require('../supabase');
const { demoReviews, demoMovies } = require('../demoData');

/**
 * Basic HTML tag sanitizer to prevent XSS in user submissions
 */
function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * GET /api/movies/:id/reviews
 * Retrieve all reviews for a specific movie, ordered newest first
 */
router.get('/movies/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;

    // --- CASE 1: Supabase Connected ---
    if (isConfigured() && supabase) {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('movie_id', id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return res.json({
        count: data ? data.length : 0,
        data: data || []
      });
    }

    // --- CASE 2: Demo / In-Memory Fallback Mode ---
    const movieReviews = demoReviews
      .filter(r => r.movie_id === id)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.json({
      count: movieReviews.length,
      data: movieReviews
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({
      error: 'Failed to retrieve reviews',
      message: error.message
    });
  }
});

/**
 * POST /api/movies/:id/reviews
 * Add a new verified review for a movie
 * Body: { reviewer_name, rating, review_text }
 */
router.post('/movies/:id/reviews', async (req, res) => {
  try {
    const { id: movieId } = req.params;
    let { reviewer_name, rating, review_text } = req.body;

    // 1. Validate Reviewer Name
    if (!reviewer_name || typeof reviewer_name !== 'string' || reviewer_name.trim().length < 2) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Reviewer name is required and must be at least 2 characters long.'
      });
    }
    if (reviewer_name.trim().length > 100) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Reviewer name must not exceed 100 characters.'
      });
    }

    // 2. Validate Star Rating (1 to 5)
    const numericRating = Number(rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Rating must be a whole number between 1 and 5 stars.'
      });
    }

    // 3. Validate Review Text
    if (!review_text || typeof review_text !== 'string' || review_text.trim().length < 5) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Review text must be at least 5 characters long.'
      });
    }
    if (review_text.trim().length > 1000) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Review text cannot exceed 1000 characters.'
      });
    }

    const cleanReviewerName = sanitizeText(reviewer_name.trim());
    const cleanReviewText = sanitizeText(review_text.trim());

    // --- CASE 1: Supabase Connected ---
    if (isConfigured() && supabase) {
      // First ensure the movie exists
      const { data: movie, error: movieError } = await supabase
        .from('movies')
        .select('id')
        .eq('id', movieId)
        .single();

      if (movieError || !movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      const newReviewPayload = {
        movie_id: movieId,
        reviewer_name: cleanReviewerName,
        rating: numericRating,
        review_text: cleanReviewText
      };

      const { data, error } = await supabase
        .from('reviews')
        .insert([newReviewPayload])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return res.status(201).json({
        message: 'Review added successfully to Supabase database',
        data
      });
    }

    // --- CASE 2: Demo / In-Memory Fallback Mode ---
    const movieExists = demoMovies.some(m => m.id === movieId);
    if (!movieExists) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const newDemoReview = {
      id: 'rev-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      movie_id: movieId,
      reviewer_name: cleanReviewerName,
      rating: numericRating,
      review_text: cleanReviewText,
      created_at: new Date().toISOString()
    };

    demoReviews.unshift(newDemoReview);

    return res.status(201).json({
      message: 'Review added successfully (stored in demo memory)',
      data: newDemoReview
    });

  } catch (error) {
    console.error('Error adding review:', error);
    return res.status(500).json({
      error: 'Failed to submit review',
      message: error.message
    });
  }
});

/**
 * DELETE /api/reviews/:id
 * Delete a review by review ID
 */
router.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.trim() === '') {
      return res.status(400).json({ error: 'Review ID is required' });
    }

    // --- CASE 1: Supabase Connected ---
    if (isConfigured() && supabase) {
      const { data, error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Review not found or already deleted' });
      }

      return res.json({
        message: 'Review deleted successfully from Supabase',
        id
      });
    }

    // --- CASE 2: Demo / In-Memory Fallback Mode ---
    const index = demoReviews.findIndex(r => r.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Review not found or already deleted' });
    }

    demoReviews.splice(index, 1);

    return res.json({
      message: 'Review deleted successfully',
      id
    });

  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({
      error: 'Failed to delete review',
      message: error.message
    });
  }
});

module.exports = router;

