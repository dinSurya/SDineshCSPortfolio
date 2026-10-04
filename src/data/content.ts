// All site content lives here so the hero, projects, modal, skills and
// command palette read from one source. Update this file, not the components.

export const profile = {
  name: 'Surya Dineshkumar',
  email: 'surya.dineshkumar@gmail.com',
  github: 'https://github.com/dinSurya',
  linkedin: 'https://www.linkedin.com/in/surya-dineshkumar',
  resume: '/Surya_Dineshkumar_Resume.pdf',
  photo: '/assets/surya-profile-photo.jpeg',
  location: 'Herndon, VA',
}

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

// Hero terminal: one entry per command chip.
export const commands: Record<string, string[]> = {
  whoami: [
    'Surya Dineshkumar',
    'B.S. Computer Science, University of Maryland (May 2028)',
    'Minors: Mathematics, Computational Finance',
  ],
  'cat now.txt': [
    'building   Cleaning Scheduler (Next.js + Supabase)',
    'won        MLH Best Use of Tiger Data, hackUMBC 2026',
    'seeking    Summer 2027 SWE / DS internships',
  ],
  'ls projects/': [
    'success-metrics-dashboard/',
    'cleaning-scheduler/',
    'the-music-factory/',
    'my-desktop/',
  ],
  'ls experience/': [
    '2026  ina-solutions/   data science intern',
    '2024  excelacom/       software engineer intern',
    '2021  codewizardshq/   software dev track',
  ],
  contact: [
    'email     surya.dineshkumar@gmail.com',
    'github    github.com/dinSurya',
    'linkedin  linkedin.com/in/surya-dineshkumar',
  ],
}

export type Experience = {
  id: string
  kind: 'INTERNSHIP' | 'PROGRAM'
  role: string
  org: string
  place: string
  dates: string
  bullets: string[]
  stats: { v: string; k: string }[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    id: 'ina',
    kind: 'INTERNSHIP',
    role: 'Data Science Intern',
    org: 'INA Solutions Inc.',
    place: 'Remote',
    dates: 'Jun – Jul 2026',
    stats: [{ v: '56', k: 'tables in the source schema' }],
    bullets: [
      'Built a pipeline using Llama 2 7B to generate synthetic CSV test data from a 56-table relational database schema',
      'Generated data was used to develop an analytical AI chatbot for two research-focused clients',
      'Wrote automated tests to check the generated data for integrity and correctness',
      'Documented the system with architecture diagrams, workflows and data models',
    ],
    tags: ['Llama 2 7B', 'Synthetic data', 'Python', 'Testing'],
  },
  {
    id: 'excelacom',
    kind: 'INTERNSHIP',
    role: 'Software Engineer Intern',
    org: 'Excelacom',
    place: 'Reston, VA',
    dates: 'Jul 2024',
    stats: [
      { v: '57%', k: 'cut in catalog complexity' },
      { v: '2,800+', k: 'billing codes analyzed' },
    ],
    bullets: [
      'Supported a product-catalog rationalization project for a major telecom client that cut catalog complexity by 57%',
      'Analyzed 2,800+ billing codes for customer uptake and revenue patterns to flag consolidation candidates',
      'Performed data validation and customer-level analysis used in the team’s code-mapping recommendations',
    ],
    tags: ['Data validation', 'Analysis', 'SQL'],
  },
  {
    id: 'cwhq',
    kind: 'PROGRAM',
    role: 'Software Development Track',
    org: 'CodeWizardsHQ',
    place: 'Remote',
    dates: 'Sep 2021 – Sep 2024',
    stats: [],
    bullets: [
      'Completed a 3-year pre-college program building full-stack web apps',
      'Worked with Python, Flask, REST APIs, SQL databases and Git',
    ],
    tags: ['Python', 'Flask', 'REST APIs', 'SQL', 'Git'],
  },
]

export type ProjectLink = { label: string; href: string; kind: 'code' | 'demo' | 'writeup' }

export type Project = {
  id: string
  cat: 'data' | 'web'
  title: string
  date: string
  context: string
  badge?: string
  summary: string
  overview: string[]
  approach: string[]
  results: { v: string; k: string }[]
  stack: string[]
  links: ProjectLink[]
  image?: string
}

export const projects: Project[] = [
  {
    id: 'smd',
    cat: 'data',
    title: 'Success Metrics Dashboard',
    date: 'SEP 2026',
    context: 'hackUMBC 2026 · 2-person team',
    badge: 'WINNER · MLH BEST USE OF TIGER DATA',
    summary:
      'What makes a UMBC student “successful”? Six alumni and student datasets, tested with ANOVA and regression: first-job type explains ~20% of starting-salary variation, vs. ~2% for major.',
    overview: [
      'Every student asks some version of the same question: what should I be doing right now to set myself up for success? We had data on thousands of UMBC alumni and current students and wanted to give answers backed by evidence, without defining “success” for anyone.',
      'The result is a scroll-driven data story, a set of tested findings, and Advisor Ann, an AI advisor whose recommendations come only from relationships that passed significance tests.',
      'My role: led the data analysis and visualization, and built the models behind Advisor Ann’s student-placement recommendations.',
    ],
    approach: [
      'Explored six datasets (alumni, employment history, current students, experiences, transcripts, course catalog) in Jupyter with pandas and NumPy',
      'Used ANOVA (η²) to see which factors explain starting salary, and regression to check which hold up together',
      'Dropped any group with fewer than 50 alumni so medians stayed reliable; added confidence intervals on proportions',
      'Loaded the data into Tiger Data (TimescaleDB): hypertables with columnstore compression and continuous aggregates for instant dashboard queries',
      'Built a four-step advisor pipeline: fit the profile, compare to peers, project outcomes from regression + the 50 most similar alumni, rank changes by expected salary gain',
    ],
    results: [
      { v: '~20%', k: 'of starting-salary variation explained by first-job family' },
      { v: '~2%', k: 'explained by major' },
      { v: '12.6% → 4.9%', k: 'unemployment, zero internships vs. three' },
      { v: '+$5–7K', k: 'median starting salary with a return offer' },
    ],
    stack: ['Python', 'pandas', 'SciPy', 'statsmodels', 'Matplotlib', 'Jupyter', 'Tiger Data'],
    links: [
      { label: 'Live demo', href: 'https://successmatrixdashboard.vercel.app/', kind: 'demo' },
      { label: 'Devpost', href: 'https://devpost.com/software/success-metric-dashboard', kind: 'writeup' },
      { label: 'Code', href: 'https://github.com/dinSurya/TSWhackUMBC', kind: 'code' },
    ],
    image: '/assets/projects/success-metrics.jpg',
  },
  {
    id: 'cs',
    cat: 'web',
    title: 'Cleaning Scheduler',
    date: 'MAY 2026 – PRESENT',
    context: 'Client project · Mary’s Cleaning Service',
    summary:
      'A full-stack appointment manager with recurring scheduling, a dashboard and a calendar view, built for an active local business.',
    overview: [
      'Mary’s Cleaning Service needed a better way to manage recurring client appointments than spreadsheets and texts.',
      'I built a full-stack scheduler for the owner and kept refining it based on her regular feedback.',
    ],
    approach: [
      'Built the app with Next.js and TypeScript, styled with Tailwind CSS',
      'Modeled clients and appointments in PostgreSQL through Supabase',
      'Added recurring scheduling so repeat clients don’t have to be re-entered',
      'Created a dashboard and a calendar view of upcoming jobs',
      'Shipped on Vercel and iterated with the business owner',
    ],
    results: [
      { v: 'Live', k: 'in use by an active local business' },
      { v: 'Recurring', k: 'scheduling built in' },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
    links: [
      { label: 'Live demo', href: 'https://cleaning-scheduler-nine.vercel.app/', kind: 'demo' },
      { label: 'Code', href: 'https://github.com/dinSurya/cleaning-scheduler', kind: 'code' },
    ],
    image: '/assets/projects/cleaning-scheduler.jpg',
  },
  {
    id: 'mf',
    cat: 'web',
    title: 'The Music Factory',
    date: 'MAY 2023 – PRESENT',
    context: 'Music education site',
    summary:
      'A full-stack music-theory learning site with a database-backed question bank, built to offer free lessons to kids who can’t afford them.',
    overview: [
      'I combined programming and music to build a site that offers free music-theory lessons to underprivileged children.',
      'Learners practice across seven question types, from reading the staff to identifying chords by ear.',
    ],
    approach: [
      'Built the backend in Flask with SQLAlchemy over a SQL database of question types and questions',
      'Covered seven skills: reading the staff, note lengths, key signatures, terms, chords (reading and listening), and transcribing melodies',
      'Designed responsive, mobile-friendly pages using Bootstrap and custom CSS',
      'Deployed on PythonAnywhere',
    ],
    results: [
      { v: '7', k: 'music-theory question types' },
      { v: 'Free', k: 'for every learner' },
    ],
    stack: ['Python', 'Flask', 'SQL', 'HTML/CSS', 'Bootstrap'],
    links: [
      { label: 'Visit site', href: 'https://suryad.pythonanywhere.com', kind: 'demo' },
      { label: 'Code', href: 'https://github.com/dinSurya/TheMusicFactory', kind: 'code' },
    ],
    image: '/assets/projects/music-factory.jpg',
  },
  {
    id: 'md',
    cat: 'web',
    title: 'My Desktop',
    date: '2024',
    context: 'CodeWizardsHQ capstone',
    summary:
      'A personal browser “desktop” with the date, widgets, and a notes pad that saves locally between visits.',
    overview: [
      'A capstone front-end project: a personal start page that behaves like a small desktop in the browser.',
    ],
    approach: [
      'Laid out the desktop and widgets with HTML and CSS',
      'Used JavaScript and jQuery to render the date and handle widget interactions',
      'Persisted notes in localStorage so they survive a page reload',
    ],
    results: [{ v: 'localStorage', k: 'notes that persist between visits' }],
    stack: ['HTML/CSS', 'JavaScript', 'jQuery'],
    links: [{ label: 'Code', href: 'https://github.com/dinSurya/my-desktop', kind: 'code' }],
  },
]

// Each skill lists the source ids (project or experience) where it was used.
export const skillSources = [
  { id: 'all', label: 'Everything' },
  { id: 'smd', label: 'Success Metrics Dashboard' },
  { id: 'cs', label: 'Cleaning Scheduler' },
  { id: 'mf', label: 'The Music Factory' },
  { id: 'md', label: 'My Desktop' },
  { id: 'ina', label: 'INA Solutions' },
  { id: 'cwhq', label: 'CodeWizardsHQ' },
] as const

export const skillGroups: { title: string; items: { n: string; used: string[] }[] }[] = [
  {
    title: 'Languages',
    items: [
      { n: 'Python', used: ['smd', 'mf', 'ina', 'cwhq'] },
      { n: 'TypeScript', used: ['cs'] },
      { n: 'SQL', used: ['cs', 'mf', 'cwhq'] },
      { n: 'JavaScript', used: ['md'] },
      { n: 'HTML/CSS', used: ['mf', 'md'] },
      { n: 'Java', used: [] },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { n: 'Next.js', used: ['cs'] },
      { n: 'React', used: ['cs'] },
      { n: 'Tailwind CSS', used: ['cs'] },
      { n: 'Flask', used: ['mf', 'cwhq'] },
      { n: 'Bootstrap', used: ['mf'] },
      { n: 'pandas', used: ['smd'] },
      { n: 'NumPy', used: ['smd'] },
      { n: 'SciPy', used: ['smd'] },
      { n: 'statsmodels', used: ['smd'] },
      { n: 'Matplotlib', used: ['smd'] },
      { n: 'scikit-learn', used: [] },
    ],
  },
  {
    title: 'Data & Tools',
    items: [
      { n: 'PostgreSQL', used: ['cs', 'smd'] },
      { n: 'Supabase', used: ['cs'] },
      { n: 'Jupyter', used: ['smd'] },
      { n: 'Git/GitHub', used: ['smd', 'cs', 'mf', 'cwhq'] },
      { n: 'Vercel', used: ['cs', 'smd'] },
      { n: 'JUnit', used: [] },
      { n: 'Salesforce', used: [] },
    ],
  },
]
