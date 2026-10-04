# Surya Dineshkumar · CS Portfolio

Personal portfolio for Surya Dineshkumar, a Computer Science student at the University of Maryland (B.S. expected May 2028, minors in Mathematics and Computational Finance).

Built with **React 19**, **TypeScript**, **Vite** and **Tailwind CSS v4**.

## Sections

- **Hero**: interactive terminal; click a command chip to change the output
- **About**: bento grid with photo, GPA, CodeWizardsHQ, a flip card for coursework, and awards
- **Experience**: timeline accordion (INA Solutions, Excelacom, CodeWizardsHQ)
- **Projects**: filterable carousel with a case-study popup for each project
  - [Success Metrics Dashboard](https://successmatrixdashboard.vercel.app/): hackUMBC 2026, MLH Best Use of Tiger Data ([Devpost](https://devpost.com/software/success-metric-dashboard), [code](https://github.com/dinSurya/TSWhackUMBC))
  - [Cleaning Scheduler](https://cleaning-scheduler-nine.vercel.app/): client project ([code](https://github.com/dinSurya/cleaning-scheduler))
  - [The Music Factory](https://suryad.pythonanywhere.com): free music-theory lessons ([code](https://github.com/dinSurya/TheMusicFactory))
  - [My Desktop](https://github.com/dinSurya/my-desktop): browser desktop capstone
- **Skills**: pick a project to highlight the skills it used
- **Contact**: form, direct links and resume download
- **⌘K / Ctrl+K**: command palette for quick navigation

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Editing content

All text lives in [`src/data/content.ts`](src/data/content.ts): profile links, terminal commands, experience, projects (including case-study tabs) and skills. The carousel, case-study modal, skills filter and command palette all read from it.

- Resume: replace `public/Surya_Dineshkumar_Resume.pdf`
- Project screenshots: `public/assets/projects/`

## Contact form

Copy `.env.example` to `.env.local` and set `VITE_FORMSPREE_ID` to send messages through [Formspree](https://formspree.io). Without it, the form opens a prefilled email.

## Deploying

The site is deployed to GitHub Pages at https://dinsurya.github.io/SDineshCSPortfolio/ by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`. In the repo's **Settings → Pages**, the source must be set to **GitHub Actions**.

`base` in [`vite.config.ts`](vite.config.ts) matches the repo name. If the repo is renamed or moved to a custom domain, update it (use `'/'` for a custom domain).

To use Formspree in production, add `VITE_FORMSPREE_ID` as a repository variable under **Settings → Secrets and variables → Actions → Variables**.

## Structure

```
public/                  static files (favicons, photo, resume, screenshots)
src/
  data/content.ts        all site content
  components/            one component per section, plus modal, palette, toast
  useActiveSection.ts    scroll-spy for the nav
  index.css              Tailwind theme tokens and shared utilities
```
