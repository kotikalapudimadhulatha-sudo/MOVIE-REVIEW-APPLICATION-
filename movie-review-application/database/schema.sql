-- ============================================================
-- CineReview Hub — Movie Review Application
-- Supabase PostgreSQL Database Schema
-- ============================================================

-- 1. Enable pgcrypto extension for UUID generation (enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Drop existing tables and views if recreating (clean setup)
DROP VIEW IF EXISTS movie_ratings_view CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS movies CASCADE;

-- 3. Create 'movies' table
CREATE TABLE movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    language VARCHAR(50) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    release_year INT NOT NULL CHECK (release_year >= 1900 AND release_year <= 2100),
    director VARCHAR(150),
    description TEXT NOT NULL,
    poster_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create 'reviews' table linked to 'movies' with foreign key constraint
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    reviewer_name VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Performance Indexes
CREATE INDEX idx_reviews_movie_id ON reviews(movie_id);
CREATE INDEX idx_movies_language ON movies(language);
CREATE INDEX idx_movies_genre ON movies(genre);
CREATE INDEX idx_movies_title ON movies(title);

-- 6. Safe View to calculate average ratings and review counts dynamically
CREATE OR REPLACE VIEW movie_ratings_view AS
SELECT 
    m.id,
    m.title,
    m.language,
    m.genre,
    m.release_year,
    m.director,
    m.description,
    m.poster_url,
    m.created_at,
    COALESCE(ROUND(AVG(r.rating)::numeric, 1), 0.0) AS average_rating,
    COUNT(r.id)::int AS review_count
FROM movies m
LEFT JOIN reviews r ON m.id = r.movie_id
GROUP BY m.id;

-- ============================================================
-- 7. Seed Data: Curated Cinema Collection (Indian & Global)
-- Comprehensive Telugu Cinema (Tollywood Legends & Blockbusters),
-- plus Hindi, Tamil, Malayalam, Kannada & English Classics
-- ============================================================

INSERT INTO movies (id, title, language, genre, release_year, director, description, poster_url) VALUES
-- Telugu Movies (Tollywood Stars, Eras & Favourites)
('11111111-1111-1111-1111-111111111101', 'RRR', 'Telugu', 'Action / Period', 2022, 'S. S. Rajamouli', 
'Starring Jr. NTR and Ram Charan. A fearless revolutionary (Komaram Bheem) and an officer in the British force (Alluri Sitarama Raju), who once shared a deep bond of friendship, join forces to wage an inspiring war against the British Raj in 1920s India.', 
'https://image.tmdb.org/t/p/w500/nYWfCGzFicXRWQTzT2k3FXWyNQR.jpg'),

('11111111-1111-1111-1111-111111111102', 'Baahubali 2: The Conclusion', 'Telugu', 'Action / Epic', 2017, 'S. S. Rajamouli', 
'Starring Prabhas, Rana Daggubati, and Anushka Shetty. When Shiva, the son of Bahubali, learns about his royal heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom and why Kattappa killed Baahubali.', 
'https://image.tmdb.org/t/p/w500/21EQixfcEEuacmvDLGg1W4rIvUS.jpg'),

('11111111-1111-1111-1111-111111111103', 'Baahubali: The Beginning', 'Telugu', 'Action / Epic', 2015, 'S. S. Rajamouli', 
'Starring Prabhas, Rana Daggubati, and Tamannaah Bhatia. In the kingdom of Mahishmati, Shivudu is raised by tribal villagers near a waterfall. When he ascends the mountain, he rescues Avantika and discovers his true identity as Mahendra Baahubali.', 
'https://image.tmdb.org/t/p/w500/9baq7jaqj7B7kLglTf032q7jD4g.jpg'),

('11111111-1111-1111-1111-111111111104', 'Pushpa: The Rise', 'Telugu', 'Action / Crime', 2021, 'Sukumar', 
'Starring Allu Arjun, Rashmika Mandanna, and Fahadh Faasil. Pushpa Raj, a coolie in the Seshachalam forests, rises through the ranks of the red sandalwood smuggling syndicate with audacious courage and street-smart swagger.', 
'https://image.tmdb.org/t/p/w500/r01wR3X8qO8Fw5h4k4w91i4f8sK.jpg'),

('11111111-1111-1111-1111-111111111105', 'Ala Vaikunthapurramuloo', 'Telugu', 'Action / Comedy / Drama', 2020, 'Trivikram Srinivas', 
'Starring Allu Arjun, Pooja Hegde, and Tabu. Bantu grows up neglected by his calculating father Valmiki, only to discover that he was switched at birth with the son of a billionaire businessman. He sets out to protect his biological family.', 
'https://image.tmdb.org/t/p/w500/2rzORJaegE2bbKNVkQXbZCeV0BP.jpg'),

('11111111-1111-1111-1111-111111111106', 'Race Gurram', 'Telugu', 'Action / Comedy', 2014, 'Surender Reddy', 
'Starring Allu Arjun, Shruti Haasan, and Shaam. Two brothers with completely contrasting personalities—one a disciplined police officer and the other an easygoing rebel—clash with a corrupt politician aiming for power.', 
'https://upload.wikimedia.org/wikipedia/en/6/64/Race_Gurram_%28film%29_poster.jpg'),

('11111111-1111-1111-1111-111111111107', 'Arya', 'Telugu', 'Romance / Comedy / Drama', 2004, 'Sukumar', 
'Starring Allu Arjun, Anuradha Mehta, and Siva Balaji. Arya falls in love with Geetha at first sight, knowing she is in a relationship with a local politician''s son. He professes a philosophy of one-sided selfless love that changes everyone around him.', 
'https://upload.wikimedia.org/wikipedia/en/3/3d/Aarya_Telugu_Movie.jpg'),

('11111111-1111-1111-1111-111111111108', 'Kalki 2898 AD', 'Telugu', 'Sci-Fi / Mythological', 2024, 'Nag Ashwin', 
'Starring Prabhas, Amitabh Bachchan, Kamal Haasan, and Deepika Padukone. In the post-apocalyptic dystopian city of Kasi in 2898 AD, the immortal warrior Ashwatthama awaits the arrival of Kalki, the tenth avatar of Vishnu, to save humanity from the tyrannical Supreme Yaskin.', 
'https://image.tmdb.org/t/p/w500/gZftgh2jtIwmkn1fO5e3U6gE6u7.jpg'),

('11111111-1111-1111-1111-111111111109', 'Salaar: Part 1 - Ceasefire', 'Telugu', 'Action / Thriller', 2023, 'Prashanth Neel', 
'Starring Prabhas, Prithviraj Sukumaran, and Shruti Haasan. In the lawless walled city of Khansaar, a prince named Varadha calls upon his childhood friend and exiled warrior Deva to help him secure his rightful throne against ruthless coup plotters.', 
'https://image.tmdb.org/t/p/w500/9IBc1KNZmVHMwM4J9DWbc81CSTM.jpg'),

('11111111-1111-1111-1111-111111111110', 'Mirchi', 'Telugu', 'Action / Drama', 2013, 'Koratala Siva', 
'Starring Prabhas, Anushka Shetty, and Richa Gangopadhyay. Jai, an architect based in Milan, returns to Andhra Pradesh on a mission of peace to reconcile two warring families through love and understanding rather than violence.', 
'https://upload.wikimedia.org/wikipedia/en/a/a8/Mirchi_film_poster.jpg'),

('11111111-1111-1111-1111-111111111111', 'Pokiri', 'Telugu', 'Action / Crime / Thriller', 2006, 'Puri Jagannadh', 
'Starring Mahesh Babu, Ileana D''Cruz, and Prakash Raj. Pandu, a fearless hitman who kills for money in Hyderabad''s underworld, finds himself in a deadly clash between rival mafia gangs and the police force, hiding a monumental undercover secret.', 
'https://image.tmdb.org/t/p/w500/z3mlTunM7Ck7WB6inIuKJ6b8hjb.jpg'),

('11111111-1111-1111-1111-111111111112', 'Srimanthudu', 'Telugu', 'Action / Drama', 2015, 'Koratala Siva', 
'Starring Mahesh Babu, Shruti Haasan, and Jagapathi Babu. Harsha, the idealistic heir to a multi-billion-dollar empire, decides to adopt and transform his ancestral village Devarakota, taking on corrupt politicians to restore rural prosperity.', 
'https://image.tmdb.org/t/p/w500/qHSgSMZUiIqKCe76PBs6QuA6MRM.jpg'),

('11111111-1111-1111-1111-111111111113', 'Dookudu', 'Telugu', 'Action / Comedy / Thriller', 2011, 'Srinu Vaitla', 
'Starring Mahesh Babu, Samantha Ruth Prabhu, and Prakash Raj. An undercover cop, Ajay Kumar, hunts down an international mafia don while creating an elaborate illusion to convince his recovering father that he is an honorable politician.', 
'https://upload.wikimedia.org/wikipedia/en/4/40/Dookudu_poster.jpg'),

('11111111-1111-1111-1111-111111111114', 'Devara: Part 1', 'Telugu', 'Action / Drama / Period', 2024, 'Koratala Siva', 
'Starring Jr. NTR, Janhvi Kapoor, and Saif Ali Khan. Set in a forgotten coastal village, Devara, a fearless sea pirate with a moral code, wages a war to eradicate criminal maritime smuggling, leaving an indomitable legacy for his hesitant son Vara.', 
'https://image.tmdb.org/t/p/w500/h5JPvXnngFX6g1X5OaGgE6WpEhs.jpg'),

('11111111-1111-1111-1111-111111111115', 'Aravinda Sametha Veera Raghava', 'Telugu', 'Action / Drama', 2018, 'Trivikram Srinivas', 
'Starring Jr. NTR, Pooja Hegde, and Jagapathi Babu. Following the tragic death of his father in a 30-year Rayalaseema factional feud, Veera Raghava vows to choose non-violence and bring lasting peace between the bloodthirsty clans.', 
'https://upload.wikimedia.org/wikipedia/en/a/a2/Aravinda_Sametha_Veera_Raghava.jpg'),

('11111111-1111-1111-1111-111111111116', 'Janatha Garage', 'Telugu', 'Action / Drama', 2016, 'Koratala Siva', 
'Starring Mohanlal, Jr. NTR, Samantha, and Nithya Menen. An environmental activist in Mumbai is drawn into the world of Janatha Garage in Hyderabad, a vigilante community workshop that delivers swift justice to the oppressed.', 
'https://image.tmdb.org/t/p/w500/rE0oI9dY6n6dF9h7m0lX9qX6vK1.jpg'),

('11111111-1111-1111-1111-111111111117', 'Rangasthalam', 'Telugu', 'Action / Period / Drama', 2018, 'Sukumar', 
'Starring Ram Charan, Samantha Ruth Prabhu, and Aadhi Pinisetty. In the 1980s village of Rangasthalam, Chitti Babu, an endearing partially hearing-impaired mechanic, stands up against an oppressive 30-year village president after his brother is targeted.', 
'https://image.tmdb.org/t/p/w500/xG5R19X4Yq8kHwG0d4cZcT4cK0U.jpg'),

('11111111-1111-1111-1111-111111111118', 'Magadheera', 'Telugu', 'Action / Fantasy / Period', 2009, 'S. S. Rajamouli', 
'Starring Ram Charan, Kajal Aggarwal, and Dev Gill. A stunt biker discovers his past life as Kala Bhairava, an elite warrior of the 17th-century Udaigarh kingdom, and battles a reincarnated villain to reunite with his true love Mitra.', 
'https://image.tmdb.org/t/p/w500/q32wS7qX7Q1tK6f6O0vY2qK1V2A.jpg'),

('11111111-1111-1111-1111-111111111119', 'Jersey', 'Telugu', 'Drama / Sports', 2019, 'Gowtam Tinnanuri', 
'Starring Nani, Shraddha Srinath, and Ronit Kamra. Arjun, a gifted ex-cricketer in his mid-thirties, returns to the cricket pitch after a decade of hardship to fulfill his young son''s dream of seeing him wear the Indian team jersey.', 
'https://image.tmdb.org/t/p/w500/kn97c92JtqtwaWhycs69XfW4Vrm.jpg'),

('11111111-1111-1111-1111-111111111120', 'Hi Nanna', 'Telugu', 'Drama / Romance / Family', 2023, 'Shouryuv', 
'Starring Nani, Mrunal Thakur, and Baby Kiara. A dedicated single father raising his six-year-old daughter with cystic fibrosis finds their lives beautifully upended when a compassionate woman enters their world and awakens suppressed memories.', 
'https://image.tmdb.org/t/p/w500/aTf82Xb1W8d0966nSgPjGj81r68.jpg'),

('11111111-1111-1111-1111-111111111121', 'Eega', 'Telugu', 'Fantasy / Action / Revenge', 2012, 'S. S. Rajamouli', 
'Starring Nani, Samantha Ruth Prabhu, and Sudeep. Nani is murdered by a ruthless multimillionaire rival in love. He is reincarnated as a common housefly and uses ingenious tactics to protect his lover Bindu and exact vengeance.', 
'https://image.tmdb.org/t/p/w500/fRnUneA1BatlG7Mg5sV69a4nrqV.jpg'),

('11111111-1111-1111-1111-111111111122', 'Arjun Reddy', 'Telugu', 'Drama / Romance', 2017, 'Sandeep Reddy Vanga', 
'Starring Vijay Deverakonda, Shalini Pandey, and Rahul Ramakrishna. A brilliant house surgeon with severe anger management problems spirals into severe self-destruction and addiction when his girlfriend is forced to marry another man.', 
'https://image.tmdb.org/t/p/w500/hM8iQ80u9k0t3d84N4Y6qgq6lP7.jpg'),

('11111111-1111-1111-1111-111111111123', 'Geetha Govindam', 'Telugu', 'Comedy / Romance', 2018, 'Parasuram', 
'Starring Vijay Deverakonda, Rashmika Mandanna, and Subbaraju. A well-mannered college lecturer, Vijay Govind, is misunderstood by a headstrong woman named Geetha after an awkward bus incident, leading to hilarious attempts to win her trust.', 
'https://image.tmdb.org/t/p/w500/wP3G8t3Xf8p0X7d848k8wW5m8qP.jpg'),

('11111111-1111-1111-1111-111111111124', 'Sita Ramam', 'Telugu', 'Drama / Romance', 2022, 'Hanu Raghavapudi', 
'Starring Dulquer Salmaan, Mrunal Thakur, and Rashmika Mandanna. An orphaned Indian Army lieutenant, Ram, stationed in Kashmir receives anonymous romantic letters from a girl named Sita Mahalakshmi, sparking an epic love story traversing political turmoil.', 
'https://image.tmdb.org/t/p/w500/eg2xyjo3X9326s3b3mP2J5e3Sg8.jpg'),

('11111111-1111-1111-1111-111111111125', 'Mayabazar', 'Telugu', 'Mythological / Fantasy / Classic', 1957, 'K. V. Reddy', 
'Starring N. T. Rama Rao (Sr. NTR), S. V. Ranga Rao, Savitri, and Gemini Ganesan. The timeless mythological masterpiece depicting how Ghatotkacha uses supernatural illusions and wit to unite Abhimanyu with his beloved Sasirekha, thwarting Duryodhana''s schemes.', 
'https://upload.wikimedia.org/wikipedia/en/b/bb/Mayabazar.jpg'),

('11111111-1111-1111-1111-111111111126', 'C/o Kancharapalem', 'Telugu', 'Drama / Romance / Indie', 2018, 'Venkatesh Maha', 
'Starring Subba Rao, Radha Bessy, Mohan Bhagath, and Praveena Paruchuri. Set in a quaint neighborhood of Visakhapatnam, four unconventional love stories across different ages, religions, and social barriers reflect the true purity of human empathy.', 
'https://upload.wikimedia.org/wikipedia/en/d/d3/C-o_Kancharapalem.jpg'),

('11111111-1111-1111-1111-111111111127', 'Manam', 'Telugu', 'Fantasy / Drama / Family', 2014, 'Vikram Kumar', 
'Starring Akkineni Nageswara Rao (ANR), Akkineni Nagarjuna, Naga Chaitanya, and Samantha. Spanning a century, a tragic couple who died in an accident is reincarnated, bringing together three generations of the iconic Akkineni family to fulfill their timeless destiny of love.', 
'https://upload.wikimedia.org/wikipedia/en/0/0c/Manam_poster.jpg'),

('11111111-1111-1111-1111-111111111128', 'Gabbar Singh', 'Telugu', 'Action / Comedy', 2012, 'Harish Shankar', 
'Starring Pawan Kalyan, Shruti Haasan, and Abhimanyu Singh. A charismatic and fearless police officer who styles himself as Gabbar Singh takes charge of the lawless Kondaveedu town, taking down local kingpin Siddhappa Naidu with iconic swag.', 
'https://upload.wikimedia.org/wikipedia/en/9/90/Gabbar_singh_poster.jpg'),

('11111111-1111-1111-1111-111111111129', 'Nuvvu Naaku Nachav', 'Telugu', 'Comedy / Romance / Family', 2001, 'K. Vijaya Bhaskar', 
'Starring Venkatesh Daggubati, Aarthi Agarwal, and Prakash Raj. Venkatesh delivers an unforgettable comic masterclass as Venky, an easygoing man who travels to Hyderabad and unwittingly falls in love with his father''s best friend''s engaged daughter.', 
'https://upload.wikimedia.org/wikipedia/en/9/95/Nuvvu_Naaku_Nachav.jpg'),

('11111111-1111-1111-1111-111111111130', 'Indra', 'Telugu', 'Action / Drama', 2002, 'B. Gopal', 
'Starring Chiranjeevi, Sonali Bendre, and Aarthi Agarwal. Indrasena Reddy, a revered patriarch in Rayalaseema, sacrifices everything to build a life-saving reservoir for drought-stricken villages while maintaining harmony between rival factions.', 
'https://upload.wikimedia.org/wikipedia/en/f/fe/Indra_2002_film_poster.jpg'),

-- Hindi Movies
('11111111-1111-1111-1111-111111111131', 'Dangal', 'Hindi', 'Biography / Drama / Sports', 2016, 'Nitesh Tiwari', 
'Starring Aamir Khan, Fatima Sana Shaikh, and Sanya Malhotra. Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.', 
'https://image.tmdb.org/t/p/w500/p22z3y0q8U02bWv28325gOa5YgB.jpg'),

('11111111-1111-1111-1111-111111111132', '3 Idiots', 'Hindi', 'Comedy / Drama', 2009, 'Rajkumar Hirani', 
'Starring Aamir Khan, R. Madhavan, Sharman Joshi, and Kareena Kapoor. Two friends search for their long-lost college buddy Farhan and Raju while recounting their adventurous days at the prestigious Imperial College of Engineering.', 
'https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg'),

('11111111-1111-1111-1111-111111111133', 'Jawan', 'Hindi', 'Action / Thriller', 2023, 'Atlee', 
'Starring Shah Rukh Khan, Nayanthara, and Vijay Sethupathi. A high-octane action thriller outlining the emotional journey of a prison warden driven by a personal vendetta to rectify the societal corruption across the nation.', 
'https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg'),

-- Tamil Movies
('11111111-1111-1111-1111-111111111134', 'Vikram', 'Tamil', 'Action / Thriller', 2022, 'Lokesh Kanagaraj', 
'Starring Kamal Haasan, Vijay Sethupathi, and Fahadh Faasil. A special investigator is assigned a case of serial killings, uncovering a war waged by masked vigilantes against an illicit drug syndicate.', 
'https://upload.wikimedia.org/wikipedia/en/9/93/Vikram_2022_poster.jpg'),

('11111111-1111-1111-1111-111111111135', 'Jai Bhim', 'Tamil', 'Drama / Legal', 2021, 'T. J. Gnanavel', 
'Starring Suriya, Lijomol Jose, and K. Manikandan. When a tribal man is arrested for an alleged theft and goes missing from police custody, an advocate fights fearlessly in court to uncover the truth.', 
'https://upload.wikimedia.org/wikipedia/en/a/ad/Jai_Bhim_film_poster.jpg'),

-- Malayalam Movies
('11111111-1111-1111-1111-111111111136', 'Manjummel Boys', 'Malayalam', 'Thriller / Survival', 2024, 'Chidambaram', 
'Starring Soubin Shahir, Sreenath Bhasi, and Balu Varghese. A group of friends from Kochi embark on a trip to Kodaikanal, where an unexpected tragedy in the Guna Caves tests their courage, loyalty, and sheer will to survive.', 
'https://upload.wikimedia.org/wikipedia/en/9/99/Manjummel_Boys_poster.jpg'),

('11111111-1111-1111-1111-111111111137', 'Drishyam', 'Malayalam', 'Thriller / Crime', 2013, 'Jeethu Joseph', 
'Starring Mohanlal, Meena, and Ansiba Hassan. A humble cable TV operator takes desperate measures to protect his wife and daughters after an accidental crime threatens their quiet family life.', 
'https://upload.wikimedia.org/wikipedia/en/9/9e/DrishyamMovie.jpg'),

-- Kannada Movies
('11111111-1111-1111-1111-111111111138', 'K.G.F: Chapter 2', 'Kannada', 'Action / Period', 2022, 'Prashanth Neel', 
'Starring Yash, Sanjay Dutt, Raveena Tandon, and Srinidhi Shetty. In the blood-soaked Kolar Gold Fields, Rocky''s name strikes fear into his foes. While his allies look up to him, the government sees him as a danger to law and order.', 
'https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2.jpg'),

('11111111-1111-1111-1111-111111111139', 'Kantara', 'Kannada', 'Action / Thriller / Mythological', 2022, 'Rishab Shetty', 
'Starring Rishab Shetty, Sapthami Gowda, and Kishore. When greed leads to a conflict between villagers and the forest department, a young tribal champion invokes the ancient guardian spirits of his ancestors.', 
'https://upload.wikimedia.org/wikipedia/en/8/84/Kantara_poster.jpeg'),

-- English Movies
('11111111-1111-1111-1111-111111111140', 'Oppenheimer', 'English', 'Biography / Drama / History', 2023, 'Christopher Nolan', 
'Starring Cillian Murphy, Emily Blunt, Matt Damon, and Robert Downey Jr. The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.', 
'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'),

('11111111-1111-1111-1111-111111111141', 'Interstellar', 'English', 'Sci-Fi / Adventure / Drama', 2014, 'Christopher Nolan', 
'Starring Matthew McConaughey, Anne Hathaway, and Jessica Chastain. When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers to find a new planet for humans.', 
'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),

('11111111-1111-1111-1111-111111111142', 'The Dark Knight', 'English', 'Action / Crime / Drama', 2008, 'Christopher Nolan', 
'Starring Christian Bale, Heath Ledger, and Aaron Eckhart. When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 
'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 8. Seed Initial Reviews
-- ============================================================

INSERT INTO reviews (movie_id, reviewer_name, rating, review_text) VALUES
('11111111-1111-1111-1111-111111111101', 'Arjun Varma', 5, 'An absolute cinematic masterpiece! The energy, background score by Keeravani, and the action choreography between NTR and Ram Charan are unmatched worldwide.'),
('11111111-1111-1111-1111-111111111101', 'Pooja Reddy', 5, 'The "Naatu Naatu" sequence had the entire theater dancing. Rajamouli has taken Indian cinema to the international stage.'),
('11111111-1111-1111-1111-111111111102', 'Kiran Kumar', 5, 'The visual grandeur and the emotional payoff in the climax were breathtaking. Prabhas and Rana delivered career-defining performances.'),
('11111111-1111-1111-1111-111111111104', 'Ravi Teja', 4, 'Allu Arjun is exceptional as Pushpa. The swag, dialogue delivery, and rustic songs by Devi Sri Prasad make it an addictive watch.'),
('11111111-1111-1111-1111-111111111108', 'Suresh Babu', 5, 'Mind-blowing visuals and Indian mythology blend! Amitabh Bachchan as Ashwatthama steals every single scene.'),
('11111111-1111-1111-1111-111111111111', 'Vamsi Krishna', 5, 'Mahesh Babu''s swagger and Puri Jagannadh''s dialogues redefined mass commercial cinema forever in Tollywood!'),
('11111111-1111-1111-1111-111111111117', 'Deepika Rao', 5, 'Ram Charan''s performance as Chitti Babu is deeply moving. Sukumar created an atmospheric classic.'),
('11111111-1111-1111-1111-111111111119', 'Siddharth', 5, 'One of the greatest sports dramas ever made in India. Nani made me weep with pride and emotion.'),
('11111111-1111-1111-1111-111111111122', 'Anand', 5, 'Raw, intense, and unfiltered. Vijay Deverakonda''s presence is electric from start to finish.'),
('11111111-1111-1111-1111-111111111125', 'Dr. K. S. Rao', 5, 'The gold standard of Indian cinema. S.V. Ranga Rao as Ghatotkacha and NTR as Krishna remain peerless.'),
('11111111-1111-1111-1111-111111111131', 'Vikas Sharma', 5, 'Truly inspiring film. Aamir Khan and the girls gave powerhouse performances that make you shed tears of pride.'),
('11111111-1111-1111-1111-111111111140', 'David Miller', 5, 'A biographical tour-de-force by Christopher Nolan with Cillian Murphy in top form. The sound design is extraordinary.');

