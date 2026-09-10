# Olamzy_Graphics Portfolio

A modern, dark-themed personal portfolio website for **Quam Oyekan Alani (aka Olamzy_Graphics)** — Graphic Designer, Frontend Developer & Web Developer.

Live sections include a hero, about, skills, services, a filterable projects showcase with a multi-image lightbox gallery, client testimonials, and a working contact form.

---

## Built With

- HTML5
- CSS3 (custom properties, no framework)
- Vanilla JavaScript (no build step, no dependencies)
- [Google Fonts](https://fonts.google.com/) — Syne + DM Sans
- [Remix Icon](https://remixicon.com/) via CDN
- [Formspree](https://formspree.io/) for contact form submissions

---

## Features

- 🌓 Light / dark theme toggle (saved in `localStorage`)
- ⏳ Animated page loader
- 🖱️ Custom cursor glow + hero particles background
- 📜 Smooth scroll navigation with active-section highlighting + scroll progress bar
- ⌨️ Typing animation cycling through roles (Graphic Designer, Frontend Developer, etc.)
- 🗂️ Filterable project grid — **All / Web Development / Graphic Design / UI-UX** — with live counts per category
- 🖼️ Project preview **lightbox with multi-image gallery support** — cards with more than one image (e.g. a logo concept set) get prev/next arrows and an image counter automatically; single-image cards just open directly
- 💬 Client testimonials slider (auto-playing + manual controls)
- 📩 Contact form with client-side validation and Formspree submission handling (success/error states, loading spinner)
- 📱 Fully responsive — tested down to small mobile widths

---

## Project Structure

```
├── index.html      # Main (and only) HTML page
├── style.css        # All styles and theme definitions
├── script.js         # All interactivity: theming, nav, particles,
│                      # typing effect, project filter/modal, slider,
│                      # contact form, scroll effects
└── Assets/
    ├── (profile & about images)
    └── projects/
        ├── business-card-letterhead.jpg
        ├── murty-brand-identity.jpg
        ├── boi-adufe-logo.jpg
        ├── amoke-co-collection.jpg
        ├── laundry-service-flyer.jpg
        ├── coca-cola-flyer-series.jpg
        ├── nesa-economics-campaign.jpg
        └── eddys-gadget-logo-1.jpg … -5.jpg
```

> **Note:** `index.html` only links to `style.css` and `script.js`. If you still have `main.js`, `contact.html`, or `olamzy_portfolio.html` from an earlier version of this project sitting in the folder, they're no longer referenced by the current site and are safe to delete once you've confirmed you don't need anything from them.

---

## How to Use

1. Open the project folder in your code editor.
2. Open `index.html` directly in your browser, **or** serve it locally (recommended, since some browsers restrict local file access needed for smooth image loading):

   ```bash
   npx http-server .
   ```

   Then visit:

   ```text
   http://localhost:8080
   ```

   VS Code's **Live Server** extension works just as well.

---

## Customize

| What | Where |
|---|---|
| Name, bio, roles, social links | `index.html` → Hero section |
| About text & stats | `index.html` → About section |
| Skill bars & skill cards | `index.html` → Skills section |
| Services offered | `index.html` → Services section |
| Project cards & images | `index.html` → Projects section (see below) |
| CV download link | `index.html` → About section, `.download-cv` button `href` |
| Colors, fonts, spacing | `style.css` → `:root` variables at the top |
| Contact form endpoint | `script.js` → `FORMSPREE_URL` constant |

### Adding / editing a project card

Each project card's **Preview** button carries the data the lightbox reads from:

```html
<button
  class="btn btn-sm btn-preview-img"
  onclick="openProjectModal(this)"
  data-title="Project Title"
  data-desc="Short project description."
  data-tags="Tag1,Tag2,Tag3"
  data-imgs="Assets/projects/image-1.jpg,Assets/projects/image-2.jpg"
>
  <i class="ri-fullscreen-line"></i> Preview
</button>
```

- **One path** in `data-imgs` → single-image preview, no arrows.
- **Multiple comma-separated paths** → gallery mode, with prev/next arrows and a counter added automatically.
- Any `<a>` links in the same card's overlay (Live Demo, GitHub, View Full, Prototype) are pulled into the modal's action buttons automatically — update the link once on the card and the modal stays in sync.

To add a brand-new card, duplicate an existing `.project-card` block, set `data-category` to `web`, `design`, or `uiux`, and update the image, title, description, tags, and links.

---

## Author

**Quam Oyekan Alani** — Olamzy_Graphics
Graphic Designer · Frontend Developer · Web Developer

Portfolio built as a personal design and development showcase.
