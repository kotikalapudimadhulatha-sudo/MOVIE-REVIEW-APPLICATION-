// backend/demoData.js
// Curated Cinema Dataset & In-Memory Store for CineReview Hub
// Expanded with a rich collection of Telugu cinema across eras & stars

const demoMovies = [
  // ==========================================
  // Telugu Cinema (Tollywood Blockbusters & Classics)
  // ==========================================
  {
    id: "11111111-1111-1111-1111-111111111101",
    title: "RRR",
    language: "Telugu",
    genre: "Action / Period",
    release_year: 2022,
    director: "S. S. Rajamouli",
    description: "Starring Jr. NTR and Ram Charan. A fearless revolutionary (Komaram Bheem) and an officer in the British force (Alluri Sitarama Raju), who once shared a deep bond of friendship, join forces to wage an inspiring war against the British Raj in 1920s India.",
    poster_url: "https://image.tmdb.org/t/p/w500/nYWfCGzFicXRWQTzT2k3FXWyNQR.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    title: "Baahubali 2: The Conclusion",
    language: "Telugu",
    genre: "Action / Epic",
    release_year: 2017,
    director: "S. S. Rajamouli",
    description: "Starring Prabhas, Rana Daggubati, and Anushka Shetty. When Shiva, the son of Bahubali, learns about his royal heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom and why Kattappa killed Baahubali.",
    poster_url: "https://image.tmdb.org/t/p/w500/21EQixfcEEuacmvDLGg1W4rIvUS.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111103",
    title: "Baahubali: The Beginning",
    language: "Telugu",
    genre: "Action / Epic",
    release_year: 2015,
    director: "S. S. Rajamouli",
    description: "Starring Prabhas, Rana Daggubati, and Tamannaah Bhatia. In the kingdom of Mahishmati, Shivudu is raised by tribal villagers near a waterfall. When he ascends the mountain, he rescues Avantika and discovers his true identity as Mahendra Baahubali.",
    poster_url: "https://image.tmdb.org/t/p/w500/9baq7jaqj7B7kLglTf032q7jD4g.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111104",
    title: "Pushpa: The Rise",
    language: "Telugu",
    genre: "Action / Crime",
    release_year: 2021,
    director: "Sukumar",
    description: "Starring Allu Arjun, Rashmika Mandanna, and Fahadh Faasil. Pushpa Raj, a coolie in the Seshachalam forests, rises through the ranks of the red sandalwood smuggling syndicate with audacious courage and street-smart swagger.",
    poster_url: "https://image.tmdb.org/t/p/w500/r01wR3X8qO8Fw5h4k4w91i4f8sK.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111105",
    title: "Ala Vaikunthapurramuloo",
    language: "Telugu",
    genre: "Action / Comedy / Drama",
    release_year: 2020,
    director: "Trivikram Srinivas",
    description: "Starring Allu Arjun, Pooja Hegde, and Tabu. Bantu grows up neglected by his calculating father Valmiki, only to discover that he was switched at birth with the son of a billionaire businessman. He sets out to protect his biological family.",
    poster_url: "https://image.tmdb.org/t/p/w500/2rzORJaegE2bbKNVkQXbZCeV0BP.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111106",
    title: "Race Gurram",
    language: "Telugu",
    genre: "Action / Comedy",
    release_year: 2014,
    director: "Surender Reddy",
    description: "Starring Allu Arjun, Shruti Haasan, and Shaam. Two brothers with completely contrasting personalities—one a disciplined police officer and the other an easygoing rebel—clash with a corrupt politician aiming for power.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/6/64/Race_Gurram_%28film%29_poster.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111107",
    title: "Arya",
    language: "Telugu",
    genre: "Romance / Comedy / Drama",
    release_year: 2004,
    director: "Sukumar",
    description: "Starring Allu Arjun, Anuradha Mehta, and Siva Balaji. Arya falls in love with Geetha at first sight, knowing she is in a relationship with a local politician's son. He professes a philosophy of one-sided selfless love that changes everyone around him.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/3/3d/Aarya_Telugu_Movie.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111108",
    title: "Kalki 2898 AD",
    language: "Telugu",
    genre: "Sci-Fi / Mythological",
    release_year: 2024,
    director: "Nag Ashwin",
    description: "Starring Prabhas, Amitabh Bachchan, Kamal Haasan, and Deepika Padukone. In the post-apocalyptic dystopian city of Kasi in 2898 AD, the immortal warrior Ashwatthama awaits the arrival of Kalki, the tenth avatar of Vishnu, to save humanity from the tyrannical Supreme Yaskin.",
    poster_url: "https://image.tmdb.org/t/p/w500/gZftgh2jtIwmkn1fO5e3U6gE6u7.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111109",
    title: "Salaar: Part 1 - Ceasefire",
    language: "Telugu",
    genre: "Action / Thriller",
    release_year: 2023,
    director: "Prashanth Neel",
    description: "Starring Prabhas, Prithviraj Sukumaran, and Shruti Haasan. In the lawless walled city of Khansaar, a prince named Varadha calls upon his childhood friend and exiled warrior Deva to help him secure his rightful throne against ruthless coup plotters.",
    poster_url: "https://image.tmdb.org/t/p/w500/9IBc1KNZmVHMwM4J9DWbc81CSTM.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111110",
    title: "Mirchi",
    language: "Telugu",
    genre: "Action / Drama",
    release_year: 2013,
    director: "Koratala Siva",
    description: "Starring Prabhas, Anushka Shetty, and Richa Gangopadhyay. Jai, an architect based in Milan, returns to Andhra Pradesh on a mission of peace to reconcile two warring families through love and understanding rather than violence.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/a/a8/Mirchi_film_poster.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "Pokiri",
    language: "Telugu",
    genre: "Action / Crime / Thriller",
    release_year: 2006,
    director: "Puri Jagannadh",
    description: "Starring Mahesh Babu, Ileana D'Cruz, and Prakash Raj. Pandu, a fearless hitman who kills for money in Hyderabad's underworld, finds himself in a deadly clash between rival mafia gangs and the police force, hiding a monumental undercover secret.",
    poster_url: "https://image.tmdb.org/t/p/w500/z3mlTunM7Ck7WB6inIuKJ6b8hjb.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111112",
    title: "Srimanthudu",
    language: "Telugu",
    genre: "Action / Drama",
    release_year: 2015,
    director: "Koratala Siva",
    description: "Starring Mahesh Babu, Shruti Haasan, and Jagapathi Babu. Harsha, the idealistic heir to a multi-billion-dollar empire, decides to adopt and transform his ancestral village Devarakota, taking on corrupt politicians to restore rural prosperity.",
    poster_url: "https://image.tmdb.org/t/p/w500/qHSgSMZUiIqKCe76PBs6QuA6MRM.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111113",
    title: "Dookudu",
    language: "Telugu",
    genre: "Action / Comedy / Thriller",
    release_year: 2011,
    director: "Srinu Vaitla",
    description: "Starring Mahesh Babu, Samantha Ruth Prabhu, and Prakash Raj. An undercover cop, Ajay Kumar, hunts down an international mafia don while creating an elaborate illusion to convince his recovering father that he is an honorable politician.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/4/40/Dookudu_poster.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111114",
    title: "Devara: Part 1",
    language: "Telugu",
    genre: "Action / Drama / Period",
    release_year: 2024,
    director: "Koratala Siva",
    description: "Starring Jr. NTR, Janhvi Kapoor, and Saif Ali Khan. Set in a forgotten coastal village, Devara, a fearless sea pirate with a moral code, wages a war to eradicate criminal maritime smuggling, leaving an indomitable legacy for his hesitant son Vara.",
    poster_url: "https://image.tmdb.org/t/p/w500/h5JPvXnngFX6g1X5OaGgE6WpEhs.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111115",
    title: "Aravinda Sametha Veera Raghava",
    language: "Telugu",
    genre: "Action / Drama",
    release_year: 2018,
    director: "Trivikram Srinivas",
    description: "Starring Jr. NTR, Pooja Hegde, and Jagapathi Babu. Following the tragic death of his father in a 30-year Rayalaseema factional feud, Veera Raghava vows to choose non-violence and bring lasting peace between the bloodthirsty clans.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/a/a2/Aravinda_Sametha_Veera_Raghava.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111116",
    title: "Janatha Garage",
    language: "Telugu",
    genre: "Action / Drama",
    release_year: 2016,
    director: "Koratala Siva",
    description: "Starring Mohanlal, Jr. NTR, Samantha, and Nithya Menen. An environmental activist in Mumbai is drawn into the world of Janatha Garage in Hyderabad, a vigilante community workshop that delivers swift justice to the oppressed.",
    poster_url: "https://image.tmdb.org/t/p/w500/rE0oI9dY6n6dF9h7m0lX9qX6vK1.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111117",
    title: "Rangasthalam",
    language: "Telugu",
    genre: "Action / Period / Drama",
    release_year: 2018,
    director: "Sukumar",
    description: "Starring Ram Charan, Samantha Ruth Prabhu, and Aadhi Pinisetty. In the 1980s village of Rangasthalam, Chitti Babu, an endearing partially hearing-impaired mechanic, stands up against an oppressive 30-year village president after his brother is targeted.",
    poster_url: "https://image.tmdb.org/t/p/w500/xG5R19X4Yq8kHwG0d4cZcT4cK0U.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111118",
    title: "Magadheera",
    language: "Telugu",
    genre: "Action / Fantasy / Period",
    release_year: 2009,
    director: "S. S. Rajamouli",
    description: "Starring Ram Charan, Kajal Aggarwal, and Dev Gill. A stunt biker discovers his past life as Kala Bhairava, an elite warrior of the 17th-century Udaigarh kingdom, and battles a reincarnated villain to reunite with his true love Mitra.",
    poster_url: "https://image.tmdb.org/t/p/w500/q32wS7qX7Q1tK6f6O0vY2qK1V2A.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111119",
    title: "Jersey",
    language: "Telugu",
    genre: "Drama / Sports",
    release_year: 2019,
    director: "Gowtam Tinnanuri",
    description: "Starring Nani, Shraddha Srinath, and Ronit Kamra. Arjun, a gifted ex-cricketer in his mid-thirties, returns to the cricket pitch after a decade of hardship to fulfill his young son's dream of seeing him wear the Indian team jersey.",
    poster_url: "https://image.tmdb.org/t/p/w500/kn97c92JtqtwaWhycs69XfW4Vrm.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111120",
    title: "Hi Nanna",
    language: "Telugu",
    genre: "Drama / Romance / Family",
    release_year: 2023,
    director: "Shouryuv",
    description: "Starring Nani, Mrunal Thakur, and Baby Kiara. A dedicated single father raising his six-year-old daughter with cystic fibrosis finds their lives beautifully upended when a compassionate woman enters their world and awakens suppressed memories.",
    poster_url: "https://image.tmdb.org/t/p/w500/aTf82Xb1W8d0966nSgPjGj81r68.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111121",
    title: "Eega",
    language: "Telugu",
    genre: "Fantasy / Action / Revenge",
    release_year: 2012,
    director: "S. S. Rajamouli",
    description: "Starring Nani, Samantha Ruth Prabhu, and Sudeep. Nani is murdered by a ruthless multimillionaire rival in love. He is reincarnated as a common housefly and uses ingenious tactics to protect his lover Bindu and exact vengeance.",
    poster_url: "https://image.tmdb.org/t/p/w500/fRnUneA1BatlG7Mg5sV69a4nrqV.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111122",
    title: "Arjun Reddy",
    language: "Telugu",
    genre: "Drama / Romance",
    release_year: 2017,
    director: "Sandeep Reddy Vanga",
    description: "Starring Vijay Deverakonda, Shalini Pandey, and Rahul Ramakrishna. A brilliant house surgeon with severe anger management problems spirals into severe self-destruction and addiction when his girlfriend is forced to marry another man.",
    poster_url: "https://image.tmdb.org/t/p/w500/hM8iQ80u9k0t3d84N4Y6qgq6lP7.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111123",
    title: "Geetha Govindam",
    language: "Telugu",
    genre: "Comedy / Romance",
    release_year: 2018,
    director: "Parasuram",
    description: "Starring Vijay Deverakonda, Rashmika Mandanna, and Subbaraju. A well-mannered college lecturer, Vijay Govind, is misunderstood by a headstrong woman named Geetha after an awkward bus incident, leading to hilarious attempts to win her trust.",
    poster_url: "https://image.tmdb.org/t/p/w500/wP3G8t3Xf8p0X7d848k8wW5m8qP.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111124",
    title: "Sita Ramam",
    language: "Telugu",
    genre: "Drama / Romance",
    release_year: 2022,
    director: "Hanu Raghavapudi",
    description: "Starring Dulquer Salmaan, Mrunal Thakur, and Rashmika Mandanna. An orphaned Indian Army lieutenant, Ram, stationed in Kashmir receives anonymous romantic letters from a girl named Sita Mahalakshmi, sparking an epic love story traversing political turmoil.",
    poster_url: "https://image.tmdb.org/t/p/w500/eg2xyjo3X9326s3b3mP2J5e3Sg8.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111125",
    title: "Mayabazar",
    language: "Telugu",
    genre: "Mythological / Fantasy / Classic",
    release_year: 1957,
    director: "K. V. Reddy",
    description: "Starring N. T. Rama Rao (Sr. NTR), S. V. Ranga Rao, Savitri, and Gemini Ganesan. The timeless mythological masterpiece depicting how Ghatotkacha uses supernatural illusions and wit to unite Abhimanyu with his beloved Sasirekha, thwarting Duryodhana's schemes.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/b/bb/Mayabazar.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111126",
    title: "C/o Kancharapalem",
    language: "Telugu",
    genre: "Drama / Romance / Indie",
    release_year: 2018,
    director: "Venkatesh Maha",
    description: "Starring Subba Rao, Radha Bessy, Mohan Bhagath, and Praveena Paruchuri. Set in a quaint neighborhood of Visakhapatnam, four unconventional love stories across different ages, religions, and social barriers reflect the true purity of human empathy.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/d/d3/C-o_Kancharapalem.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111127",
    title: "Manam",
    language: "Telugu",
    genre: "Fantasy / Drama / Family",
    release_year: 2014,
    director: "Vikram Kumar",
    description: "Starring Akkineni Nageswara Rao (ANR), Akkineni Nagarjuna, Naga Chaitanya, and Samantha. Spanning a century, a tragic couple who died in an accident is reincarnated, bringing together three generations of the iconic Akkineni family to fulfill their timeless destiny of love.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/0/0c/Manam_poster.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111128",
    title: "Gabbar Singh",
    language: "Telugu",
    genre: "Action / Comedy",
    release_year: 2012,
    director: "Harish Shankar",
    description: "Starring Pawan Kalyan, Shruti Haasan, and Abhimanyu Singh. A charismatic and fearless police officer who styles himself as Gabbar Singh takes charge of the lawless Kondaveedu town, taking down local kingpin Siddhappa Naidu with iconic swag.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/9/90/Gabbar_singh_poster.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111129",
    title: "Nuvvu Naaku Nachav",
    language: "Telugu",
    genre: "Comedy / Romance / Family",
    release_year: 2001,
    director: "K. Vijaya Bhaskar",
    description: "Starring Venkatesh Daggubati, Aarthi Agarwal, and Prakash Raj. Venkatesh delivers an unforgettable comic masterclass as Venky, an easygoing man who travels to Hyderabad and unwittingly falls in love with his father's best friend's engaged daughter.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/9/95/Nuvvu_Naaku_Nachav.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111130",
    title: "Indra",
    language: "Telugu",
    genre: "Action / Drama",
    release_year: 2002,
    director: "B. Gopal",
    description: "Starring Chiranjeevi, Sonali Bendre, and Aarthi Agarwal. Indrasena Reddy, a revered patriarch in Rayalaseema, sacrifices everything to build a life-saving reservoir for drought-stricken villages while maintaining harmony between rival factions.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/f/fe/Indra_2002_film_poster.jpg"
  },

  // ==========================================
  // Hindi Cinema (Bollywood)
  // ==========================================
  {
    id: "11111111-1111-1111-1111-111111111131",
    title: "Dangal",
    language: "Hindi",
    genre: "Biography / Drama / Sports",
    release_year: 2016,
    director: "Nitesh Tiwari",
    description: "Starring Aamir Khan, Fatima Sana Shaikh, and Sanya Malhotra. Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.",
    poster_url: "https://image.tmdb.org/t/p/w500/p22z3y0q8U02bWv28325gOa5YgB.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111132",
    title: "3 Idiots",
    language: "Hindi",
    genre: "Comedy / Drama",
    release_year: 2009,
    director: "Rajkumar Hirani",
    description: "Starring Aamir Khan, R. Madhavan, Sharman Joshi, and Kareena Kapoor. Two friends search for their long-lost companion while revisiting their college days and reminiscing about the friend who inspired them to think differently.",
    poster_url: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111133",
    title: "Jawan",
    language: "Hindi",
    genre: "Action / Thriller",
    release_year: 2023,
    director: "Atlee",
    description: "Starring Shah Rukh Khan, Nayanthara, and Vijay Sethupathi. A high-octane action thriller outlining the emotional journey of a prison warden driven by a personal vendetta to rectify the societal corruption across the nation.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg"
  },

  // ==========================================
  // Tamil Cinema (Kollywood)
  // ==========================================
  {
    id: "11111111-1111-1111-1111-111111111134",
    title: "Vikram",
    language: "Tamil",
    genre: "Action / Thriller",
    release_year: 2022,
    director: "Lokesh Kanagaraj",
    description: "Starring Kamal Haasan, Vijay Sethupathi, and Fahadh Faasil. A special investigator is assigned a case of serial killings, uncovering a war waged by masked vigilantes against an illicit drug syndicate.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/9/93/Vikram_2022_poster.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111135",
    title: "Jai Bhim",
    language: "Tamil",
    genre: "Drama / Legal",
    release_year: 2021,
    director: "T. J. Gnanavel",
    description: "Starring Suriya, Lijomol Jose, and K. Manikandan. When a tribal man is arrested for an alleged theft and goes missing from police custody, an advocate fights fearlessly in court to uncover the truth.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/a/ad/Jai_Bhim_film_poster.jpg"
  },

  // ==========================================
  // Malayalam Cinema (Mollywood)
  // ==========================================
  {
    id: "11111111-1111-1111-1111-111111111136",
    title: "Manjummel Boys",
    language: "Malayalam",
    genre: "Thriller / Survival",
    release_year: 2024,
    director: "Chidambaram",
    description: "Starring Soubin Shahir, Sreenath Bhasi, and Balu Varghese. A group of friends from Kochi embark on a trip to Kodaikanal, where an unexpected tragedy in the Guna Caves tests their courage, loyalty, and sheer will to survive.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/9/99/Manjummel_Boys_poster.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111137",
    title: "Drishyam",
    language: "Malayalam",
    genre: "Thriller / Crime",
    release_year: 2013,
    director: "Jeethu Joseph",
    description: "Starring Mohanlal, Meena, and Ansiba Hassan. A humble cable TV operator takes desperate measures to protect his wife and daughters after an accidental crime threatens their quiet family life.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/9/9e/DrishyamMovie.jpg"
  },

  // ==========================================
  // Kannada Cinema (Sandalwood)
  // ==========================================
  {
    id: "11111111-1111-1111-1111-111111111138",
    title: "K.G.F: Chapter 2",
    language: "Kannada",
    genre: "Action / Period",
    release_year: 2022,
    director: "Prashanth Neel",
    description: "Starring Yash, Sanjay Dutt, Raveena Tandon, and Srinidhi Shetty. In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes. While his allies look up to him, the government sees him as a danger to law and order.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111139",
    title: "Kantara",
    language: "Kannada",
    genre: "Action / Thriller / Mythological",
    release_year: 2022,
    director: "Rishab Shetty",
    description: "Starring Rishab Shetty, Sapthami Gowda, and Kishore. When greed leads to a conflict between villagers and the forest department, a young tribal champion invokes the ancient guardian spirits of his ancestors.",
    poster_url: "https://upload.wikimedia.org/wikipedia/en/8/84/Kantara_poster.jpeg"
  },

  // ==========================================
  // English Cinema (Hollywood Classics)
  // ==========================================
  {
    id: "11111111-1111-1111-1111-111111111140",
    title: "Oppenheimer",
    language: "English",
    genre: "Biography / Drama / History",
    release_year: 2023,
    director: "Christopher Nolan",
    description: "Starring Cillian Murphy, Emily Blunt, Matt Damon, and Robert Downey Jr. The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    poster_url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111141",
    title: "Interstellar",
    language: "English",
    genre: "Sci-Fi / Adventure / Drama",
    release_year: 2014,
    director: "Christopher Nolan",
    description: "Starring Matthew McConaughey, Anne Hathaway, and Jessica Chastain. When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers to find a new planet for humans.",
    poster_url: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    id: "11111111-1111-1111-1111-111111111142",
    title: "The Dark Knight",
    language: "English",
    genre: "Action / Crime / Drama",
    release_year: 2008,
    director: "Christopher Nolan",
    description: "Starring Christian Bale, Heath Ledger, and Aaron Eckhart. When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_url: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  }
];

let demoReviews = [
  {
    id: "rev-101",
    movie_id: "11111111-1111-1111-1111-111111111101",
    reviewer_name: "Arjun Varma",
    rating: 5,
    review_text: "An absolute cinematic masterpiece! The energy, background score by Keeravani, and the action choreography between NTR and Ram Charan are unmatched worldwide.",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "rev-102",
    movie_id: "11111111-1111-1111-1111-111111111101",
    reviewer_name: "Pooja Reddy",
    rating: 5,
    review_text: "The 'Naatu Naatu' sequence had the entire theater dancing. Rajamouli has taken Indian cinema to the global stage.",
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "rev-103",
    movie_id: "11111111-1111-1111-1111-111111111102",
    reviewer_name: "Kiran Kumar",
    rating: 5,
    review_text: "The visual grandeur and the emotional payoff in the climax were breathtaking. Prabhas and Rana delivered career-defining performances.",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "rev-104",
    movie_id: "11111111-1111-1111-1111-111111111104",
    reviewer_name: "Ravi Teja",
    rating: 4,
    review_text: "Allu Arjun is exceptional as Pushpa. The swag, dialogue delivery, and rustic songs by Devi Sri Prasad make it an addictive watch.",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "rev-105",
    movie_id: "11111111-1111-1111-1111-111111111108",
    reviewer_name: "Suresh Babu",
    rating: 5,
    review_text: "Mind-blowing visuals and Indian mythology blend! Amitabh Bachchan as Ashwatthama steals every single scene.",
    created_at: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: "rev-106",
    movie_id: "11111111-1111-1111-1111-111111111111",
    reviewer_name: "Vamsi Krishna",
    rating: 5,
    review_text: "Mahesh Babu's swagger and Puri Jagannadh's dialogues redefined mass commercial cinema forever in Tollywood!",
    created_at: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: "rev-107",
    movie_id: "11111111-1111-1111-1111-111111111117",
    reviewer_name: "Deepika Rao",
    rating: 5,
    review_text: "Ram Charan's performance as Chitti Babu is deeply moving. Sukumar created an atmospheric classic.",
    created_at: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: "rev-108",
    movie_id: "11111111-1111-1111-1111-111111111119",
    reviewer_name: "Siddharth",
    rating: 5,
    review_text: "One of the greatest sports dramas ever made in India. Nani made me weep with pride and emotion.",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "rev-109",
    movie_id: "11111111-1111-1111-1111-111111111122",
    reviewer_name: "Anand",
    rating: 5,
    review_text: "Raw, intense, and unfiltered. Vijay Deverakonda's presence is electric from start to finish.",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "rev-110",
    movie_id: "11111111-1111-1111-1111-111111111125",
    reviewer_name: "Dr. K. S. Rao",
    rating: 5,
    review_text: "The gold standard of Indian cinema. S.V. Ranga Rao as Ghatotkacha and NTR as Krishna remain peerless.",
    created_at: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: "rev-111",
    movie_id: "11111111-1111-1111-1111-111111111131",
    reviewer_name: "Vikas Sharma",
    rating: 5,
    review_text: "Truly inspiring film. Aamir Khan and the girls gave powerhouse performances that make you shed tears of pride.",
    created_at: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: "rev-112",
    movie_id: "11111111-1111-1111-1111-111111111140",
    reviewer_name: "David Miller",
    rating: 5,
    review_text: "A biographical tour-de-force by Christopher Nolan with Cillian Murphy in top form. The sound design is extraordinary.",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

// Helper to calculate rating stats for a movie
function getMovieRatingStats(movieId, reviewList = demoReviews) {
  const movieRevs = reviewList.filter(r => r.movie_id === movieId);
  if (movieRevs.length === 0) {
    return { average_rating: 0, review_count: 0 };
  }
  const sum = movieRevs.reduce((acc, r) => acc + Number(r.rating), 0);
  const avg = (sum / movieRevs.length).toFixed(1);
  return {
    average_rating: parseFloat(avg),
    review_count: movieRevs.length
  };
}

module.exports = {
  demoMovies,
  demoReviews,
  getMovieRatingStats
};
