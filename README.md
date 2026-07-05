# Bidur Khanal — Portfolio

A fully responsive personal portfolio built with **HTML5**, **Tailwind CSS (via CDN)**, and **modern vanilla JavaScript (ES6+)**. No frameworks, no build step — open `index.html` in a browser and it runs.

## Folder structure

```
portfolio/
│
├── index.html
├── css/
│   └── style.css        # glassmorphism, animations, terminal UI, theme variables
├── js/
│   ├── main.js           # nav, loading screen, scroll progress, back-to-top, active links, lazy load
│   ├── animation.js       # scroll reveal, animated counters, skill bar fills
│   ├── typing.js          # hero role-typing effect
│   ├── theme.js           # dark/light toggle + localStorage persistence
│   ├── projects.js        # project filtering + search
│   ├── validation.js      # contact form validation
│   └── particles.js       # floating particle background (hero)
├── assets/
│   ├── images/            # add real project screenshots here
│   ├── profile/           # add your headshot here
│   ├── icons/
│   ├── certificates/
│   └── resume.pdf         # replace with your real resume/CV
└── README.md
```

## Before you publish

1. **Add your photo.** The hero and About sections use an SVG placeholder for the profile picture. Drop a real headshot in `assets/profile/` and update the placeholder `<div>` in `index.html` with an `<img>` tag.
2. **Add `resume.pdf`.** The "Download Resume" and "Download CV" buttons link to `assets/resume.pdf`. Add your actual file there.
3. **Update social links.** GitHub, LinkedIn, Facebook, and email links in the hero, contact, and footer sections currently point to placeholder URLs — replace with your real profiles.
4. **Update contact details.** Replace the placeholder email/phone in the Contact section.
5. **Swap project images.** Each project card currently uses an icon-on-gradient placeholder. Replace with real screenshots in `assets/images/` for a stronger impression.
6. **Wire up the contact form.** Validation is fully functional client-side, but the form does not send anywhere yet — connect it to a service like Formspree, EmailJS, or your own backend endpoint.
7. **GitHub stats.** The numbers in the GitHub section and the contribution graph are placeholders — connect the GitHub REST API or a service like github-readme-stats if you want live data.

## Features implemented

- Dark mode by default with a persistent light/dark toggle (`localStorage`)
- Terminal-style hero signature + typing animation across seven rotating roles
- Floating particle canvas background (respects `prefers-reduced-motion`)
- Scroll progress bar, sticky glass navbar, active-section highlighting
- Scroll-reveal animations, animated counters, and animated skill bars
- Project filtering by category (All / AI / Python / Web) + live search
- Accessible, validated contact form (name, email, subject, message)
- Fully responsive layout (mobile, tablet, desktop) using Flexbox and Grid
- Semantic HTML5, ARIA labels, visible focus states

## Browser support

Modern evergreen browsers (Chrome, Firefox, Edge, Safari). Uses `IntersectionObserver`, CSS custom properties, and `backdrop-filter` — all broadly supported, with graceful fallbacks where feasible.
