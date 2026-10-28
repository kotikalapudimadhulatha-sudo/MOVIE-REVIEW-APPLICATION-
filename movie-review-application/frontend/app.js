// frontend/app.js
// CineReview Hub — Frontend Client Application Logic

// Application State
const state = {
  movies: [],
  filteredMovies: [],
  activeLanguage: 'All',
  activeGenre: 'All',
  searchQuery: '',
  currentMovie: null,
  currentReviews: [],
  selectedStarRating: 5,
  reviewIdToDelete: null,
  isSubmittingReview: false
};

// Rating Descriptions for Interactive Star Selector
const RATING_DESCRIPTIONS = {
  1: '1 Star — Poor',
  2: '2 Stars — Fair',
  3: '3 Stars — Good',
  4: '4 Stars — Very Good',
  5: '5 Stars — Masterpiece'
};

// ============================================================
// DOM Elements
// ============================================================
const elements = {
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  languageTabs: document.getElementById('languageTabs'),
  genreFilter: document.getElementById('genreFilter'),
  resultsCount: document.getElementById('resultsCount'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  moviesGrid: document.getElementById('moviesGrid'),
  moviesLoading: document.getElementById('moviesLoading'),
  emptyState: document.getElementById('emptyState'),
  emptyStateMessage: document.getElementById('emptyStateMessage'),
  movieModal: document.getElementById('movieModal'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalBody: document.getElementById('modalBody'),
  confirmModal: document.getElementById('confirmModal'),
  confirmCancelBtn: document.getElementById('confirmCancelBtn'),
  confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
  dbStatusPill: document.getElementById('dbStatusPill'),
  dbStatusText: document.getElementById('dbStatusText'),
  statMoviesCount: document.getElementById('statMoviesCount'),
  statReviewsCount: document.getElementById('statReviewsCount'),
  toastContainer: document.getElementById('toastContainer')
};

// ============================================================
// Initialization
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  setupEventListeners();
});

async function initApp() {
  await checkDatabaseHealth();
  await loadMovies();
}

// ============================================================
// API Calls
// ============================================================

/**
 * Check backend and database health status
 */
async function checkDatabaseHealth() {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    const data = await res.json();

    const dot = elements.dbStatusPill.querySelector('.status-dot');
    if (data.database && data.database.connected) {
      dot.className = 'status-dot online';
      elements.dbStatusText.textContent = 'Supabase DB Live';
      elements.dbStatusPill.title = 'Connected to Supabase PostgreSQL database';
    } else {
      dot.className = 'status-dot demo';
      elements.dbStatusText.textContent = 'Demo Mode (Local)';
      elements.dbStatusPill.title = 'Running with demo in-memory storage. Add Supabase keys to connect live database.';
    }
  } catch (err) {
    console.warn('Backend health check error:', err);
    elements.dbStatusText.textContent = 'Server Offline';
  }
}

/**
 * Fetch movies list from backend with optional search and filter parameters
 */
async function loadMovies(filters = {}) {
  showLoading(true);
  try {
    const params = new URLSearchParams();
    const searchVal = filters.search !== undefined ? filters.search : state.searchQuery;
    const langVal = filters.language !== undefined ? filters.language : state.activeLanguage;
    const genreVal = filters.genre !== undefined ? filters.genre : state.activeGenre;

    if (searchVal && searchVal.trim() !== '') {
      params.append('search', searchVal.trim());
    }
    if (langVal && langVal.trim().toLowerCase() !== 'all') {
      params.append('language', langVal.trim());
    }
    if (genreVal && genreVal.trim().toLowerCase() !== 'all') {
      params.append('genre', genreVal.trim());
    }

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`/api/movies${queryStr}`);
    if (!res.ok) throw new Error('Failed to fetch movies from server');
    const result = await res.json();
    state.movies = result.data || [];
    
    // Update total count stats when viewing all movies
    if (!searchVal && langVal === 'All' && genreVal === 'All' && elements.statMoviesCount) {
      elements.statMoviesCount.textContent = `${state.movies.length}+`;
    }

    applyFilters();
  } catch (err) {
    console.error('Error loading movies:', err);
    showToast('Failed to load movies. Ensure the backend server is running.', 'error');
    elements.moviesLoading.style.display = 'none';
    elements.emptyState.style.display = 'block';
    elements.emptyStateMessage.textContent = 'Unable to connect to the backend server. Please verify the server is running on port 3000.';
  } finally {
    showLoading(false);
  }
}

/**
 * Fetch reviews for a specific movie
 */
async function fetchMovieReviews(movieId) {
  try {
    const res = await fetch(`/api/movies/${movieId}/reviews`);
    if (!res.ok) throw new Error('Failed to fetch movie reviews');
    const result = await res.json();
    return result.data || [];
  } catch (err) {
    console.error('Error fetching reviews:', err);
    showToast('Could not load reviews for this movie.', 'error');
    return [];
  }
}

// ============================================================
// Verified Movie Posters Dictionary & Fallback Resolver
// High-reliability TMDB & Wikimedia CDN sources mapped to official titles
// ============================================================
const VERIFIED_POSTERS = {
  // Telugu (Tollywood Legends, Stars & Blockbusters)
  'rrr': {
    primary: 'https://image.tmdb.org/t/p/w500/nYWfCGzFicXRWQTzT2k3FXWyNQR.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg'
  },
  'baahubali 2: the conclusion': {
    primary: 'https://image.tmdb.org/t/p/w500/21EQixfcEEuacmvDLGg1W4rIvUS.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/9/93/Baahubali_2_The_Conclusion_poster.jpg'
  },
  'baahubali: the beginning': {
    primary: 'https://image.tmdb.org/t/p/w500/9baq7jaqj7B7kLglTf032q7jD4g.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Baahubali_The_Beginning_poster.jpg'
  },
  'pushpa: the rise': {
    primary: 'https://image.tmdb.org/t/p/w500/r01wR3X8qO8Fw5h4k4w91i4f8sK.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/7/75/Pushpa_-_The_Rise_%282021_film%29.jpg'
  },
  'ala vaikunthapurramuloo': {
    primary: 'https://image.tmdb.org/t/p/w500/2rzORJaegE2bbKNVkQXbZCeV0BP.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/2/28/Ala_Vaikunthapurramuloo.jpeg'
  },
  'race gurram': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/6/64/Race_Gurram_%28film%29_poster.jpg'
  },
  'arya': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Aarya_Telugu_Movie.jpg'
  },
  'kalki 2898 ad': {
    primary: 'https://image.tmdb.org/t/p/w500/gZftgh2jtIwmkn1fO5e3U6gE6u7.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Kalki_2898_AD.jpg'
  },
  'salaar: part 1 - ceasefire': {
    primary: 'https://image.tmdb.org/t/p/w500/9IBc1KNZmVHMwM4J9DWbc81CSTM.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Salaar_Part_1_%E2%80%93_Ceasefire.jpg'
  },
  'salaar: part 1 – ceasefire': {
    primary: 'https://image.tmdb.org/t/p/w500/9IBc1KNZmVHMwM4J9DWbc81CSTM.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Salaar_Part_1_%E2%80%93_Ceasefire.jpg'
  },
  'salaar': {
    primary: 'https://image.tmdb.org/t/p/w500/9IBc1KNZmVHMwM4J9DWbc81CSTM.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Salaar_Part_1_%E2%80%93_Ceasefire.jpg'
  },
  'mirchi': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/a/a8/Mirchi_film_poster.jpg'
  },
  'pokiri': {
    primary: 'https://image.tmdb.org/t/p/w500/z3mlTunM7Ck7WB6inIuKJ6b8hjb.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Pokiri_movie_poster.jpg'
  },
  'srimanthudu': {
    primary: 'https://image.tmdb.org/t/p/w500/qHSgSMZUiIqKCe76PBs6QuA6MRM.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/8/87/Srimanthudu_poster.jpg'
  },
  'dookudu': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/4/40/Dookudu_poster.jpg'
  },
  'devara: part 1': {
    primary: 'https://image.tmdb.org/t/p/w500/h5JPvXnngFX6g1X5OaGgE6WpEhs.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Devara_Part_1.jpg'
  },
  'devara': {
    primary: 'https://image.tmdb.org/t/p/w500/h5JPvXnngFX6g1X5OaGgE6WpEhs.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Devara_Part_1.jpg'
  },
  'aravinda sametha veera raghava': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Aravinda_Sametha_Veera_Raghava.jpg'
  },
  'janatha garage': {
    primary: 'https://image.tmdb.org/t/p/w500/rE0oI9dY6n6dF9h7m0lX9qX6vK1.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/8/80/Janatha_Garage_poster.jpg'
  },
  'rangasthalam': {
    primary: 'https://image.tmdb.org/t/p/w500/xG5R19X4Yq8kHwG0d4cZcT4cK0U.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Rangasthalam.jpg'
  },
  'magadheera': {
    primary: 'https://image.tmdb.org/t/p/w500/q32wS7qX7Q1tK6f6O0vY2qK1V2A.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/5/52/Magadheera_poster.jpg'
  },
  'jersey': {
    primary: 'https://image.tmdb.org/t/p/w500/kn97c92JtqtwaWhycs69XfW4Vrm.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/4/4e/Jersey_2019_poster.jpg'
  },
  'hi nanna': {
    primary: 'https://image.tmdb.org/t/p/w500/aTf82Xb1W8d0966nSgPjGj81r68.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/2/23/Hi_Nanna_poster.jpg'
  },
  'eega': {
    primary: 'https://image.tmdb.org/t/p/w500/fRnUneA1BatlG7Mg5sV69a4nrqV.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/9/91/Eega_poster.jpg'
  },
  'arjun reddy': {
    primary: 'https://image.tmdb.org/t/p/w500/hM8iQ80u9k0t3d84N4Y6qgq6lP7.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/4/46/Arjun_Reddy.jpg'
  },
  'geetha govindam': {
    primary: 'https://image.tmdb.org/t/p/w500/wP3G8t3Xf8p0X7d848k8wW5m8qP.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/0/06/Geetha_Govindam.jpg'
  },
  'sita ramam': {
    primary: 'https://image.tmdb.org/t/p/w500/eg2xyjo3X9326s3b3mP2J5e3Sg8.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/1/1d/Sita_Ramam.jpg'
  },
  'mayabazar': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Mayabazar.jpg'
  },
  'c/o kancharapalem': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/d/d3/C-o_Kancharapalem.jpg'
  },
  'manam': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Manam_poster.jpg'
  },
  'gabbar singh': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/9/90/Gabbar_singh_poster.jpg'
  },
  'nuvvu naaku nachav': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/9/95/Nuvvu_Naaku_Nachav.jpg'
  },
  'indra': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/f/fe/Indra_2002_film_poster.jpg'
  },

  // Hindi (Bollywood)
  'dangal': {
    primary: 'https://image.tmdb.org/t/p/w500/p22z3y0q8U02bWv28325gOa5YgB.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg'
  },
  '3 idiots': {
    primary: 'https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg'
  },
  'jawan': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg'
  },

  // Tamil (Kollywood)
  'vikram': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/9/93/Vikram_2022_poster.jpg'
  },
  'jai bhim': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/a/ad/Jai_Bhim_film_poster.jpg'
  },

  // Malayalam (Mollywood)
  'manjummel boys': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/9/99/Manjummel_Boys_poster.jpg'
  },
  'drishyam': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/9/9e/DrishyamMovie.jpg'
  },

  // Kannada (Sandalwood)
  'k.g.f: chapter 2': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2.jpg'
  },
  'kgf: chapter 2': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2.jpg'
  },
  'kantara': {
    primary: 'https://upload.wikimedia.org/wikipedia/en/8/84/Kantara_poster.jpeg'
  },

  // English (Hollywood)
  'oppenheimer': {
    primary: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg'
  },
  'interstellar': {
    primary: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg'
  },
  'the dark knight': {
    primary: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg'
  }
};

/**
 * Resolve the correct authentic poster for any movie.
 * Prioritizes verified posters, filters out generic unrelated stock photos,
 * and falls back to clean placeholders when unavailable.
 */
function getPosterData(movie) {
  if (!movie) return { url: null, fallbackUrl: null };
  const rawTitle = (movie.title || '').trim().toLowerCase();

  // 1. Direct or partial key match in verified catalog
  let matchedKey = Object.keys(VERIFIED_POSTERS).find(k => k === rawTitle);
  if (!matchedKey) {
    matchedKey = Object.keys(VERIFIED_POSTERS).find(k => rawTitle.includes(k) || k.includes(rawTitle));
  }

  if (matchedKey) {
    const item = VERIFIED_POSTERS[matchedKey];
    return {
      url: item.primary,
      fallbackUrl: item.fallback || null
    };
  }

  // 2. Custom poster URL from database if not a generic stock image
  if (movie.poster_url && typeof movie.poster_url === 'string' && movie.poster_url.trim() !== '') {
    const url = movie.poster_url.trim();
    if (!url.includes('images.unsplash.com')) {
      return { url, fallbackUrl: null };
    }
  }

  // 3. Unavailable -> return null to show clean placeholder
  return { url: null, fallbackUrl: null };
}

/**
 * Handle poster loading error: tries secondary CDN fallback once,
 * then renders an elegant, clean CSS cinema placeholder.
 */
window.handlePosterError = function(imgElement, title, language) {
  const fallbackUrl = imgElement.getAttribute('data-fallback');
  if (fallbackUrl && imgElement.src !== fallbackUrl) {
    imgElement.src = fallbackUrl;
    imgElement.removeAttribute('data-fallback');
    return;
  }

  imgElement.style.display = 'none';
  const container = imgElement.parentElement;
  if (!container) return;

  // Avoid creating multiple placeholders
  if (container.querySelector('.poster-fallback')) return;

  const placeholder = document.createElement('div');
  placeholder.className = 'poster-fallback';
  placeholder.innerHTML = `
    <div class="poster-fallback-icon">🎬</div>
    <div class="poster-fallback-title">${title}</div>
    <div class="poster-fallback-badge">${language}</div>
  `;
  container.appendChild(placeholder);
};

// ============================================================
// Filtering and Search Logic
// ============================================================
function applyFilters() {
  let list = [...state.movies];
  const query = (state.searchQuery || '').trim().toLowerCase();

  // 1. Language Filter (case-insensitive)
  if (state.activeLanguage && state.activeLanguage.toLowerCase() !== 'all') {
    const lang = state.activeLanguage.toLowerCase();
    list = list.filter(m => (m.language || '').toLowerCase() === lang);
  }

  // 2. Genre Filter (case-insensitive substring)
  if (state.activeGenre && state.activeGenre.toLowerCase() !== 'all') {
    const genre = state.activeGenre.toLowerCase();
    list = list.filter(m => (m.genre || '').toLowerCase().includes(genre));
  }

  // 3. Search Query (Partial and case-insensitive on movie title, director, cast/description, and language)
  if (query !== '') {
    list = list.filter(m => {
      const title = (m.title || '').toLowerCase();
      const director = (m.director || '').toLowerCase();
      const language = (m.language || '').toLowerCase();
      const description = (m.description || '').toLowerCase();
      return title.includes(query) || director.includes(query) || language.includes(query) || description.includes(query);
    });
  }

  state.filteredMovies = list;
  renderMoviesGrid();
  updateFilterUIState();
}

function updateFilterUIState() {
  const total = state.filteredMovies.length;
  const isFiltered = state.activeLanguage !== 'All' || state.activeGenre !== 'All' || state.searchQuery.trim() !== '';

  if (isFiltered) {
    elements.resultsCount.textContent = `Showing ${total} result${total === 1 ? '' : 's'}`;
    elements.resetFiltersBtn.style.display = 'inline-block';
  } else {
    elements.resultsCount.textContent = `Showing all ${total} movies`;
    elements.resetFiltersBtn.style.display = 'none';
  }
}

function resetAllFilters() {
  state.activeLanguage = 'All';
  state.activeGenre = 'All';
  state.searchQuery = '';

  elements.searchInput.value = '';
  elements.clearSearchBtn.style.display = 'none';
  elements.genreFilter.value = 'All';

  // Reset tab active states
  const tabs = elements.languageTabs.querySelectorAll('.lang-tab');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.lang === 'All');
  });

  loadMovies({ search: '', language: 'All', genre: 'All' });
}

window.resetAllFilters = resetAllFilters;

window.filterByLang = function(lang) {
  state.activeLanguage = lang;
  const tabs = elements.languageTabs.querySelectorAll('.lang-tab');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.lang === lang);
  });
  loadMovies({ language: lang });
  const exploreSec = document.getElementById('explore');
  if (exploreSec) exploreSec.scrollIntoView({ behavior: 'smooth' });
};

// ============================================================
// Render Movie Cards Grid
// ============================================================
function renderMoviesGrid() {
  const container = elements.moviesGrid;
  container.innerHTML = '';

  if (state.filteredMovies.length === 0) {
    elements.emptyState.style.display = 'block';
    const trimmedQuery = (state.searchQuery || '').trim();
    if (trimmedQuery) {
      elements.emptyStateMessage.innerHTML = `No movies found matching "<strong>${escapeHtml(trimmedQuery)}</strong>".<br><span style="font-size:0.85rem;color:var(--text-muted);display:block;margin-top:0.4rem;">Try searching for titles like "RRR", "Kalki", "Pushpa", or "Baahubali", or click Clear All Filters.</span>`;
    } else {
      elements.emptyStateMessage.textContent = 'No movies found matching the selected language and genre filters.';
    }
    return;
  }

  elements.emptyState.style.display = 'none';

  state.filteredMovies.forEach(movie => {
    const card = document.createElement('article');
    card.className = 'movie-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${movie.title} (${movie.release_year})`);

    const ratingDisplay = movie.average_rating > 0 
      ? `<span class="rating-star">★</span> <span class="rating-value">${movie.average_rating.toFixed(1)}</span> <span class="rating-count">(${movie.review_count || 0})</span>`
      : `<span class="rating-star">★</span> <span class="rating-count">No reviews</span>`;

    const { url, fallbackUrl } = getPosterData(movie);
    const titleEscaped = escapeHtml(movie.title || 'Movie');
    const langEscaped = escapeHtml(movie.language || 'Cinema');
    const fallbackAttr = fallbackUrl ? `data-fallback="${escapeHtml(fallbackUrl)}"` : '';

    let posterInnerHtml = '';
    if (url) {
      posterInnerHtml = `
        <img 
          src="${escapeHtml(url)}" 
          alt="${titleEscaped} Poster" 
          class="card-poster"
          loading="lazy"
          referrerpolicy="no-referrer"
          ${fallbackAttr}
          onerror="handlePosterError(this, '${titleEscaped}', '${langEscaped}')"
        />
      `;
    } else {
      posterInnerHtml = `
        <div class="poster-fallback">
          <div class="poster-fallback-icon">🎬</div>
          <div class="poster-fallback-title">${titleEscaped}</div>
          <div class="poster-fallback-badge">${langEscaped}</div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="card-poster-container">
        <div class="poster-badges">
          <span class="lang-badge">${langEscaped}</span>
          <span class="year-badge">${movie.release_year || ''}</span>
        </div>
        ${posterInnerHtml}
      </div>
      <div class="card-content">
        <h3 class="card-title">${titleEscaped}</h3>
        <p class="card-genre">${escapeHtml(movie.genre || '')}</p>
        <div class="card-footer">
          <div class="card-rating">
            ${ratingDisplay}
          </div>
          <button class="card-action-btn">Reviews & Details</button>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openMovieModal(movie.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMovieModal(movie.id);
      }
    });

    container.appendChild(card);
  });
}

/**
 * Alias for backward compatibility
 */
window.handleImageError = window.handlePosterError;

// ============================================================
// Movie Details & Reviews Modal
// ============================================================
async function openMovieModal(movieId) {
  // Fetch fresh movie details
  try {
    const res = await fetch(`/api/movies/${movieId}`);
    if (!res.ok) throw new Error('Movie not found');
    state.currentMovie = await res.json();
    state.currentReviews = await fetchMovieReviews(movieId);

    renderModalContent();
    elements.movieModal.classList.add('open');
    elements.movieModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  } catch (err) {
    console.error('Error opening movie modal:', err);
    showToast('Failed to load movie details.', 'error');
  }
}

function closeMovieModal() {
  elements.movieModal.classList.remove('open');
  elements.movieModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  state.currentMovie = null;
  state.currentReviews = [];
}

function renderModalContent() {
  const m = state.currentMovie;
  if (!m) return;

  const starsString = '★'.repeat(Math.round(m.average_rating || 0)) + '☆'.repeat(5 - Math.round(m.average_rating || 0));
  const { url, fallbackUrl } = getPosterData(m);
  const titleEscaped = escapeHtml(m.title || 'Movie');
  const langEscaped = escapeHtml(m.language || 'Cinema');
  const fallbackAttr = fallbackUrl ? `data-fallback="${escapeHtml(fallbackUrl)}"` : '';

  let modalPosterHtml = '';
  if (url) {
    modalPosterHtml = `
      <img 
        src="${escapeHtml(url)}" 
        alt="${titleEscaped}" 
        class="modal-poster-img"
        loading="lazy"
        referrerpolicy="no-referrer"
        ${fallbackAttr}
        onerror="handlePosterError(this, '${titleEscaped}', '${langEscaped}')"
      />
    `;
  } else {
    modalPosterHtml = `
      <div class="poster-fallback">
        <div class="poster-fallback-icon">🎬</div>
        <div class="poster-fallback-title">${titleEscaped}</div>
        <div class="poster-fallback-badge">${langEscaped}</div>
      </div>
    `;
  }

  elements.modalBody.innerHTML = `
    <!-- Movie Details Header -->
    <div class="modal-movie-header">
      <div class="modal-poster-wrapper">
        ${modalPosterHtml}
      </div>
      <div class="modal-details">
        <div class="modal-meta-tags">
          <span class="modal-tag gold">${langEscaped}</span>
          <span class="modal-tag">${escapeHtml(m.genre || '')}</span>
          <span class="modal-tag">${m.release_year || ''}</span>
        </div>
        <h2 class="modal-movie-title">${titleEscaped}</h2>
        <p class="modal-movie-director">Directed by <strong>${escapeHtml(m.director || 'Acclaimed Director')}</strong></p>

        <!-- Rating Box -->
        <div class="modal-rating-summary">
          <div class="modal-big-rating">
            <span>★</span> ${m.average_rating > 0 ? m.average_rating.toFixed(1) : '—'}
          </div>
          <div class="modal-rating-meta">
            <div class="modal-stars-row">${starsString}</div>
            <span class="modal-review-count">${state.currentReviews.length} community review${state.currentReviews.length === 1 ? '' : 's'}</span>
          </div>
        </div>

        <p class="modal-synopsis">${escapeHtml(m.description || '')}</p>
      </div>
    </div>

    <!-- Reviews Section -->
    <section class="modal-reviews-section">
      <h3 class="reviews-section-title">
        <span>💬</span> Audience Reviews & Ratings
      </h3>

      <!-- Review Form Card -->
      <div class="review-form-card">
        <h4 class="review-form-title">
          <span>✍️</span> Write Your Review
        </h4>
        <form id="addReviewForm" onsubmit="handleReviewSubmit(event)">
          <div class="form-group">
            <label class="form-label" for="reviewerName">Your Name:</label>
            <input 
              type="text" 
              id="reviewerName" 
              class="form-input" 
              placeholder="e.g. Rahul Sharma" 
              required 
              maxlength="100"
              autocomplete="name"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Your Rating (1 to 5 Stars):</label>
            <div class="star-rating-selector" id="starSelector" role="radiogroup" aria-label="Rating selector">
              <span class="interactive-star" data-val="1" role="radio" aria-checked="false" title="1 Star">★</span>
              <span class="interactive-star" data-val="2" role="radio" aria-checked="false" title="2 Stars">★</span>
              <span class="interactive-star" data-val="3" role="radio" aria-checked="false" title="3 Stars">★</span>
              <span class="interactive-star" data-val="4" role="radio" aria-checked="false" title="4 Stars">★</span>
              <span class="interactive-star" data-val="5" role="radio" aria-checked="false" title="5 Stars">★</span>
              <span class="rating-descriptor" id="ratingDescriptor">5 Stars — Masterpiece</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="reviewText">Your Review:</label>
            <textarea 
              id="reviewText" 
              class="form-textarea" 
              placeholder="Share what you loved about the direction, performances, music, or plot..."
              required
              minlength="5"
              maxlength="1000"
              oninput="handleReviewInput(this)"
            ></textarea>
            <div class="char-counter">
              <span id="charCount">0</span> / 1000 characters
            </div>
          </div>

          <button type="submit" class="btn btn-primary" id="submitReviewBtn">
            <span>Submit Review</span>
          </button>
        </form>
      </div>

      <!-- Existing Reviews List -->
      <div class="reviews-list-container">
        <div class="reviews-list" id="modalReviewsList">
          ${renderReviewsListHtml()}
        </div>
      </div>
    </section>
  `;

  // Attach interactive star rating listeners
  initInteractiveStars();
}

function renderReviewsListHtml() {
  if (!state.currentReviews || state.currentReviews.length === 0) {
    return `
      <div class="no-reviews-box">
        <p>No reviews yet for this movie.</p>
        <span style="font-size: 0.85rem; color: var(--gold-primary);">Be the first person to share your rating above!</span>
      </div>
    `;
  }

  return state.currentReviews.map(r => {
    const initial = (r.reviewer_name || 'U').charAt(0).toUpperCase();
    const formattedDate = formatDate(r.created_at);
    const starIcons = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

    return `
      <div class="review-item" id="review-${r.id}">
        <div class="review-item-header">
          <div class="reviewer-profile">
            <div class="reviewer-avatar">${initial}</div>
            <div class="reviewer-details">
              <span class="reviewer-name">${escapeHtml(r.reviewer_name)}</span>
              <span class="review-date">${formattedDate}</span>
            </div>
          </div>
          <div class="review-actions">
            <div class="review-stars" title="${r.rating} out of 5 stars">${starIcons}</div>
            <button 
              class="delete-review-btn" 
              title="Delete review" 
              onclick="promptDeleteReview('${r.id}')"
              aria-label="Delete review"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
        <p class="review-comment">${escapeHtml(r.review_text)}</p>
      </div>
    `;
  }).join('');
}

// ============================================================
// Interactive Star Rating Selector
// ============================================================
function initInteractiveStars() {
  state.selectedStarRating = 5;
  const selector = document.getElementById('starSelector');
  if (!selector) return;

  const stars = selector.querySelectorAll('.interactive-star');
  const descriptor = document.getElementById('ratingDescriptor');

  function updateStarsVisual(rating) {
    stars.forEach(s => {
      const val = parseInt(s.dataset.val, 10);
      s.classList.toggle('selected', val <= rating);
      s.setAttribute('aria-checked', val === rating ? 'true' : 'false');
    });
    if (descriptor) {
      descriptor.textContent = RATING_DESCRIPTIONS[rating] || `${rating} Stars`;
    }
  }

  stars.forEach(star => {
    const val = parseInt(star.dataset.val, 10);

    star.addEventListener('mouseenter', () => {
      stars.forEach(s => {
        const sVal = parseInt(s.dataset.val, 10);
        s.classList.toggle('hovered', sVal <= val);
      });
      if (descriptor) descriptor.textContent = RATING_DESCRIPTIONS[val] || `${val} Stars`;
    });

    star.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hovered'));
      if (descriptor) {
        descriptor.textContent = RATING_DESCRIPTIONS[state.selectedStarRating] || `${state.selectedStarRating} Stars`;
      }
    });

    star.addEventListener('click', () => {
      state.selectedStarRating = val;
      updateStarsVisual(val);
    });
  });

  // Set initial 5 stars
  updateStarsVisual(5);
}

window.handleReviewInput = function(textarea) {
  const counter = document.getElementById('charCount');
  if (counter) {
    counter.textContent = textarea.value.length;
  }
};

// ============================================================
// Add Review Handler (POST /api/movies/:id/reviews)
// ============================================================
window.handleReviewSubmit = async function(e) {
  e.preventDefault();

  if (state.isSubmittingReview || !state.currentMovie) return;

  const nameInput = document.getElementById('reviewerName');
  const textInput = document.getElementById('reviewText');
  const submitBtn = document.getElementById('submitReviewBtn');

  const reviewer_name = nameInput.value.trim();
  const review_text = textInput.value.trim();
  const rating = state.selectedStarRating;

  // Client-side validation
  if (reviewer_name.length < 2) {
    showToast('Please enter your name (at least 2 characters).', 'error');
    nameInput.focus();
    return;
  }
  if (review_text.length < 5) {
    showToast('Please write a review of at least 5 characters.', 'error');
    textInput.focus();
    return;
  }

  state.isSubmittingReview = true;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Submitting Review...</span>';

  try {
    const res = await fetch(`/api/movies/${state.currentMovie.id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewer_name, rating, review_text })
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || result.error || 'Failed to submit review');
    }

    showToast('🎉 Review added successfully!', 'success');

    // Refresh reviews for this movie
    state.currentReviews = await fetchMovieReviews(state.currentMovie.id);

    // Refresh movie data to re-calculate average rating
    const movieRes = await fetch(`/api/movies/${state.currentMovie.id}`);
    if (movieRes.ok) {
      state.currentMovie = await movieRes.json();
    }

    // Refresh the movies list in state to update the grid card
    await refreshMoviesData();

    // Re-render modal reviews list and rating summary
    renderModalContent();

  } catch (err) {
    console.error('Error submitting review:', err);
    showToast(err.message || 'Error submitting review. Please try again.', 'error');
  } finally {
    state.isSubmittingReview = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Submit Review</span>';
    }
  }
};

// ============================================================
// Delete Review Handler (DELETE /api/reviews/:id)
// ============================================================
window.promptDeleteReview = function(reviewId) {
  state.reviewIdToDelete = reviewId;
  elements.confirmModal.classList.add('open');
  elements.confirmModal.setAttribute('aria-hidden', 'false');
};

function closeConfirmModal() {
  elements.confirmModal.classList.remove('open');
  elements.confirmModal.setAttribute('aria-hidden', 'true');
  state.reviewIdToDelete = null;
}

async function confirmDeleteReview() {
  if (!state.reviewIdToDelete) return;

  const reviewId = state.reviewIdToDelete;
  elements.confirmDeleteBtn.disabled = true;
  elements.confirmDeleteBtn.textContent = 'Deleting...';

  try {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || result.error || 'Failed to delete review');
    }

    showToast('Review deleted successfully.', 'success');
    closeConfirmModal();

    // Refresh current reviews
    if (state.currentMovie) {
      state.currentReviews = await fetchMovieReviews(state.currentMovie.id);
      
      const movieRes = await fetch(`/api/movies/${state.currentMovie.id}`);
      if (movieRes.ok) {
        state.currentMovie = await movieRes.json();
      }

      await refreshMoviesData();
      renderModalContent();
    }

  } catch (err) {
    console.error('Error deleting review:', err);
    showToast(err.message || 'Could not delete review.', 'error');
  } finally {
    elements.confirmDeleteBtn.disabled = false;
    elements.confirmDeleteBtn.textContent = 'Yes, Delete';
  }
}

/**
 * Background refresh of movie dataset after add/delete review
 */
async function refreshMoviesData() {
  try {
    const res = await fetch('/api/movies');
    if (res.ok) {
      const result = await res.json();
      state.movies = result.data || [];
      applyFilters();
    }
  } catch (err) {
    console.warn('Background refresh error:', err);
  }
}

// ============================================================
// Event Listeners Setup
// ============================================================
function setupEventListeners() {
  let searchDebounceTimer = null;

  // Search Input Handler (supports partial, case-insensitive, and whitespace-trimmed search)
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    const hasText = state.searchQuery.trim().length > 0;
    elements.clearSearchBtn.style.display = hasText ? 'flex' : 'none';

    // 1. Instant client-side responsiveness (0ms UI lag)
    applyFilters();

    // 2. Debounced backend API synchronization (300ms)
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      loadMovies({ search: state.searchQuery });
    }, 300);
  });

  // Support pressing 'Enter' on the search input for immediate query
  elements.searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(searchDebounceTimer);
      state.searchQuery = elements.searchInput.value;
      applyFilters();
      loadMovies({ search: state.searchQuery });
    }
  });

  // Clear Search Button
  elements.clearSearchBtn.addEventListener('click', () => {
    state.searchQuery = '';
    elements.searchInput.value = '';
    elements.clearSearchBtn.style.display = 'none';
    clearTimeout(searchDebounceTimer);
    applyFilters();
    loadMovies({ search: '' });
    elements.searchInput.focus();
  });

  // Language Tabs Click
  elements.languageTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.lang-tab');
    if (!tab) return;

    elements.languageTabs.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    state.activeLanguage = tab.dataset.lang;
    applyFilters();
    loadMovies({ language: state.activeLanguage });
  });

  // Genre Filter Dropdown Change
  elements.genreFilter.addEventListener('change', (e) => {
    state.activeGenre = e.target.value;
    applyFilters();
    loadMovies({ genre: state.activeGenre });
  });

  // Reset Filters Button
  elements.resetFiltersBtn.addEventListener('click', resetAllFilters);

  // Modal Close Button
  elements.modalCloseBtn.addEventListener('click', closeMovieModal);

  // Close modal when clicking outside the dialog content
  elements.movieModal.addEventListener('click', (e) => {
    if (e.target === elements.movieModal) {
      closeMovieModal();
    }
  });

  // Confirm Delete Dialog Buttons
  elements.confirmCancelBtn.addEventListener('click', closeConfirmModal);
  elements.confirmDeleteBtn.addEventListener('click', confirmDeleteReview);
  elements.confirmModal.addEventListener('click', (e) => {
    if (e.target === elements.confirmModal) {
      closeConfirmModal();
    }
  });

  // Keyboard navigation: Escape key closes active modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (elements.confirmModal.classList.contains('open')) {
        closeConfirmModal();
      } else if (elements.movieModal.classList.contains('open')) {
        closeMovieModal();
      }
    }
  });
}

// ============================================================
// Toast Notification Utility
// ============================================================
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;

  elements.toastContainer.appendChild(toast);

  // Auto-remove toast after 4 seconds
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// ============================================================
// Helper Utilities
// ============================================================
function showLoading(show) {
  if (elements.moviesLoading) {
    elements.moviesLoading.style.display = show ? 'flex' : 'none';
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(isoString) {
  if (!isoString) return 'Recent';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Recent';
  }
}

