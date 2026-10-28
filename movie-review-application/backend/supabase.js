// backend/supabase.js
// Supabase Client Initialization and Database Configuration

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL ? process.env.SUPABASE_URL.trim() : '';
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '').trim();

// Check if valid credentials are provided
const isConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseKey.includes('your_')
);

let supabase = null;

if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log('✅ [Supabase] Connected to live Supabase instance at:', supabaseUrl);
  } catch (error) {
    console.error('❌ [Supabase] Failed to initialize Supabase client:', error.message);
    supabase = null;
  }
} else {
  console.log('ℹ️  [Supabase] Live credentials not detected in backend/.env.');
  console.log('ℹ️  [Supabase] Running in high-reliability DEMO fallback mode with pre-seeded Indian & English cinema.');
  console.log('ℹ️  [Supabase] To connect to your Supabase PostgreSQL database:');
  console.log('    1. Open backend/.env');
  console.log('    2. Add your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  console.log('    3. Run database/schema.sql in the Supabase SQL Editor');
}

module.exports = {
  supabase,
  isConfigured: () => Boolean(supabase),
  getSupabaseUrl: () => (isConfigured ? supabaseUrl : null)
};

