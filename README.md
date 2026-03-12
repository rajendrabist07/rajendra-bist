# Rajendra Bist — Developer Portfolio

> *"I value clean thinking over noisy code, and foundations over trends."*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://rajendrabist.vercel.app)
[![Built with React](https://img.shields.io/badge/Built%20with-React%2018-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Bundled%20with-Vite-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#license)

---

## What this is

Not a template. Not a drag-and-drop resume site.

This is a **systems-first developer portfolio** — engineered with the same discipline I apply to every production project. Every architectural decision in this codebase is intentional: design tokens over hardcoded values, IntersectionObserver over scroll event listeners, CSS custom properties for theme switching over JavaScript re-renders.

If you're reading this README, you already understand why that matters.

---

## Architecture at a glance

```
rajendraportfolio/
├── src/
│   ├── components/          # One concern per component
│   │   ├── Navbar.jsx       # Fixed nav with scroll-aware transparency
│   │   ├── Hero.jsx         # Full-screen intro with ambient background
│   │   ├── About.jsx        # Developer narrative + stat cards
│   │   ├── Skills.jsx       # Visual tech stack with SVG icons
│   │   ├── Projects.jsx     # 4 featured projects with SVG previews
│   │   ├── CaseStudy.jsx    # Interactive engineering walkthrough
│   │   ├── Philosophy.jsx   # Development principles
│   │   ├── Contact.jsx      # Elegant contact form + social links
│   │   └── Footer.jsx       # Minimal footer
│   ├── hooks/
│   │   ├── useTheme.js      # Dark/Light toggle via CSS data-theme
│   │   └── useScrollReveal.js  # IntersectionObserver-based reveal
│   ├── App.jsx              # Lazy-loaded section composition
│   ├── index.css            # Design token system + global styles
│   └── main.jsx             # React entry point
├── index.html               # SEO meta tags, font preloading
├── vite.config.js           # Code splitting config
└── package.json
```

---

## Design decisions worth noting

### Theme switching with zero JavaScript overhead

```css
/* ONE attribute flip on <html> — CSS does everything else */
[data-theme="light"] {
  --bg-primary: #f8f8fc;
  --text-primary: #0f0f1a;
  /* ... */
}
```

No component re-renders. No context providers for theme. The browser's cascade handles it.

### Scroll animations without scroll event listeners

```js
// IntersectionObserver fires once per element — not on every scroll frame
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    child.classList.add('visible')
    observer.unobserve(el) // clean up immediately
  }
}, { threshold: 0.15 })
```

`requestAnimationFrame` is never abused. Main thread stays free.

### Code splitting for real performance

```js
// Below-the-fold sections are lazy loaded — Hero appears instantly
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
// etc.
```

First Contentful Paint is not held hostage by sections the user hasn't scrolled to yet.

### Design tokens as the single source of truth

Every spacing value, color, shadow, and transition lives in CSS custom properties in `index.css`. Light and dark themes are a single data attribute. New components inherit the system automatically — no magic numbers, no hardcoded hex values in components.

---

## Running locally

```bash
# Clone the repository
git clone https://github.com/rajendrabist07/rajendraportfolio.git
cd rajendraportfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Node.js 18+ recommended.

---

## Performance targets

| Metric | Target | Strategy |
|--------|--------|----------|
| First Contentful Paint | < 1.5s | Hero not lazy-loaded, fonts preconnected |
| Largest Contentful Paint | < 2.5s | No render-blocking scripts |
| Cumulative Layout Shift | < 0.05 | Font display:swap, explicit dimensions |
| Lighthouse Score | 95+ | All of the above |

---

## Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| UI Framework | React 18 | Concurrent features, ecosystem |
| Bundler | Vite 4 | Sub-100ms HMR, optimized builds |
| Styling | CSS Custom Properties | Zero runtime, full control |
| Fonts | Syne + Outfit + DM Mono | Distinctive, purpose-specific pairing |
| Deployment | Vercel | Edge network, zero-config HTTPS |
| Animations | CSS + IntersectionObserver | No animation library needed |

---

## Deployment

Push to `main` branch → Vercel auto-deploys. Zero configuration required beyond initial project connection.

```bash
# If deploying manually
npm run build
# Upload /dist to your hosting provider
```

---

## Contact

If you're working on something interesting or want to discuss how web systems actually work beyond the framework layer — reach out.

- **Email**: rajendrabist07@gmail.com
- **GitHub**: [github.com/rajendrabist07](https://github.com/rajendrabist07)
- **LinkedIn**: [Rajendra Bist](https://www.linkedin.com/in/rajendra-bist-169926370)

---

## License

MIT — use it, learn from it, build on it.

---

*Built with React + Vite. Deployed on Vercel. Engineered with care.*
