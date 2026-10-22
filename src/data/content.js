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
  { name: 'Number Guessing Game', level: '01', tech: 'Python' },
  { name: 'Hangman', level: '02', tech: 'Python' },
  { name: 'Rock Paper Scissors', level: '03', tech: 'Python' },
  { name: 'Blackjack', level: '04', tech: 'Python' },
  { name: 'Maze Generator', level: '05', tech: 'Python' },
  { name: 'Trivia Quiz', level: '06', tech: 'Python + JSON' },
  { name: 'Snake', level: '07', tech: 'Python' },
  { name: 'Space Invaders', level: '08', tech: 'Python' },
  { name: 'Platformer', level: '09', tech: 'Python' },
]

export const timeline = [
  {
    label: 'Origin',
    title: 'Mechminds',
    role: 'Founder & President',
    text: 'Built a high-school robotics club from scratch and led sessions on robotics fundamentals and prototyping.',
  },
  {
    label: '2022—Now',
    title: 'USA Martial Arts',
    role: 'Junior Instructor',
    text: 'Instruct mixed-age classes of up to 34 students after earning a Black Belt.',
  },
  {
    label: 'Internship',
    title: 'Pinnacle',
    role: 'Software Intern',
    text: 'Built machine-learning models for spam detection, genre classification, and price prediction.',
  },
  {
    label: 'HackWesTX 2026',
    title: 'Campfire',
    role: '24-hour team build',
    text: 'Placed Top 5 and earned Best Use of Auth0 with a team of four.',
  },
  {
    label: 'Fall 2026—Now',
    title: 'Red Raider Racing',
    role: 'Aerodynamics Team',
    text: 'Model race-car components in SolidWorks and evaluate airflow performance in SimScale.',
  },
  {
    label: 'Fall 2026—Now',
    title: 'Space Raiders + RATS',
    role: 'Aerospace & Robotics',
    text: 'Contribute to student-led rocket and competitive robotics projects spanning design, simulation, testing, and code.',
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
