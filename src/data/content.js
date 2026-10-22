export const projects = [
  {
    slug: 'campfire',
    number: '01',
    title: 'Campfire',
    kicker: 'Study rooms, rebuilt.',
    summary: 'A shared study-room app where a group teaches its syllabus to AI, tracks real topic coverage, and stays focused together.',
    tags: ['React', 'Vite', 'Supabase', 'Auth0'],
    accent: 'lime',
  },
  {
    slug: 'python-games',
    number: '02',
    title: 'Python Games',
    kicker: 'Nine games. One learning curve.',
    summary: 'A progression from a number guesser to Space Invaders and a platformer—each project marking a new programming skill.',
    tags: ['Python', 'JSON', 'OOP', 'Arcade'],
    accent: 'cream',
  },
  {
    slug: 'diskmetrics',
    number: '03',
    title: 'DiskMetrics',
    kicker: 'Storage, made visible.',
    summary: 'A native macOS menu-bar app for storage health, live I/O activity, capacity alerts, and per-process disk monitoring.',
    tags: ['macOS', 'Systems', 'Real-time'],
    accent: 'orange',
  },
  {
    slug: 'robotics-site',
    number: '04',
    title: 'Portfolio v1',
    kicker: 'The site that started here.',
    summary: 'The original hand-built HTML and CSS portfolio, published on GitHub Pages and evolved into this React experience.',
    tags: ['HTML', 'CSS', 'GitHub Pages'],
    accent: 'blue',
  },
]

export const games = [
  { name: 'Number Guessing Game', level: '01', tech: 'Python', file: 'Game_1.html', playable: true },
  { name: 'Hangman', level: '02', tech: 'Python', file: 'Game_2.html', playable: true },
  { name: 'Rock Paper Scissors', level: '03', tech: 'Python', file: 'Game_3.html', playable: true },
  { name: 'Blackjack', level: '04', tech: 'Python', file: 'Game_4_.html', playable: true },
  { name: 'Maze Generator', level: '05', tech: 'Python', file: 'Game_5.html', playable: true },
  { name: 'Trivia Quiz', level: '06', tech: 'Python + JSON', file: 'Game_6.html', playable: true },
  { name: 'Snake', level: '07', tech: 'Python + pygame', file: 'Game_7.html', playable: false },
  { name: 'Space Invaders', level: '08', tech: 'Python + pygame', file: 'Game_8.html', playable: false },
  { name: 'Platformer', level: '09', tech: 'Python + pygame', file: 'Game_9.html', playable: false },
]

export const timeline = [
  {
    label: '2022—Present',
    title: 'Taekwondo',
    role: 'USA Martial Arts · Junior Instructor',
    text: 'Teach technique, discipline, and conditioning to mixed-age classes of up to 34 students after earning a Black Belt.',
  },
  {
    label: 'Present',
    title: 'Red Raider Racing',
    role: 'Aerodynamics Team',
    text: 'Model race-car components in SolidWorks and evaluate airflow performance in SimScale.',
  },
  {
    label: 'Present',
    title: 'Aerospace + Robotics',
    role: 'Raider Aerospace Society · RATS Robotics',
    text: 'Contribute to student-led aerospace and competitive robotics work across design, simulation, testing, and code.',
  },
  {
    label: 'Present',
    title: 'Research with Dr. Morshed',
    role: 'Cyber-Physical Systems research',
    text: 'Contribute to current research with Dr. Bashir Morshed in Texas Tech’s Cyber-Physical Systems group.',
  },
  {
    label: 'Present',
    title: 'Research with Tristan Shah',
    role: 'Dr. Stas Tiomkin’s research group',
    text: 'Contribute to research alongside PhD student Tristan Shah under Dr. Stas Tiomkin.',
  },
  {
    label: 'Present',
    title: 'Google Developer Group',
    role: 'Marketing Officer',
    text: 'Serve as Marketing Officer for the student developer community and its technical events.',
  },
]

export const campfireScreens = [
  ['01-landing.png', 'Landing', 'A shared focus-space pitch with one-click Auth0 sign-in.'],
  ['02-auth0-login.png', 'Secure sign-in', 'Email/password and Google social authentication through Auth0.'],
  ['03-create-room.png', 'Create a room', 'Name the room, tag the subject, and add an exam date.'],
  ['04-join-room.png', 'Join a room', 'Enter a shared code or revisit a room already joined.'],
  ['05-room-overview.png', 'Room overview', 'The command center for syllabus, focus, and challenges.'],
  ['06-syllabus-upload.png', 'Syllabus upload', 'Paste or upload a syllabus to build a study plan.'],
  ['07-ai-parsed-topics.png', 'AI topic review', 'Review and edit the parsed topic list before publishing it.'],
  ['08-learning-map.png', 'Learning map', 'Track the group’s topic coverage from untouched to verified.'],
  ['09-leaderboard.png', 'Group leaderboard', 'Make progress visible at both individual and room level.'],
  ['10-games.png', 'Study games', 'Three activities generated from the room’s own syllabus.'],
  ['11-flashcards.png', 'Flashcards', 'Generate quick-review cards from syllabus topics on demand.'],
  ['12-campfire-mode-phone.png', 'Campfire mode', 'Phone motion confirms that the device is face-down.'],
  ['13-live-session.png', 'Live session', 'Answer a shared AI-generated question as a group.'],
]

export const diskScreens = [
  ['01-menubar.jpg', 'One-click status', 'Free space and read/write speed without opening the full dashboard.'],
  ['02-dashboard.jpg', 'Storage health', 'S.M.A.R.T. status, live activity, capacity, and time-to-full projection.'],
  ['03-processes.jpg', 'Process activity', 'See the applications creating the most disk reads and writes.'],
  ['04-alerts.jpg', 'Capacity alerts', 'Adjustable thresholds, a live alert log, and a support-report export.'],
]
