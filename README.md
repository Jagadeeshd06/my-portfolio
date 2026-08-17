# Jagadeesh D — Portfolio

A single-page, animated developer & creative-design portfolio built with pure HTML, CSS and JavaScript — no frameworks, no build tools, no dependencies to install.

🔗 **Live site:** djagadeeshportfolio.netlify.app

---

## ✨ Features

- **Animated hero** with a canvas particle background and scroll-triggered reveals
- **Illustrated companion character** with a spoken introduction (Web Speech API)
- **Interactive skills field** — hover/tilt effect across grouped skill orbs
- **Flip-card project gallery** with detail panels and links
- **Creative work grid** with a lightbox for design pieces
- **Animated journey timeline** and **counting achievement stats**
- **Working contact form** — hands off to email (jagadeeshd901@gmail.com) or WhatsApp, no backend required
- Custom cursor, grain/noise overlay, and full responsive layout (desktop → mobile)
- Respects prefers-reduced-motion` for accessibility

## 🛠️ Tech Stack

| Layer      | Tech                                    |
|------------|---------------------------------------- |
| Structure  | HTML5                                   |
| Styling    | CSS3 (custom properties / design tokens)|
| Behavior   | Vanilla JavaScript (no frameworks)      |
| Fonts      | Google Fonts — Space Grotesk, Inter, JetBrains Mono |

## 📁 Project Structure

portfolio/
├── index.html    # Page content & section structure
├── style.css     # Design tokens (colors, type, spacing) and all styling
├── script.js     # Loader, cursor, particles, reveals, companion, tilt, timeline, counters, lightbox, contact form
└── assets/       # Static files (e.g. attached project reports)

## 🚀 Getting Started

No build step required.

**Option 1 — Open directly**
Just open index.html in your browser.

**Option 2 — Serve locally**
bash
npx serve .
then visit the local URL it prints.

## 🌐 Deploying (GitHub Pages)

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select the main branch and / (root) folder.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`.

## ⚙️ Customization

- **Colors / fonts** — edit the `:root` design tokens at the top of `style.css`.
- **Contact details** — open `script.js` and set:
  js
  const CONTACT_EMAIL = "jagadeeshd901@gmail.com";
  const WHATSAPP_NUMBER = "+91 8019401692"; // country code + number, digits only
  
- **Achievements numbers** — update the `data-target` attributes in the Achievements section of `index.html`.
- **Projects** — edit the front/back content inside each `.project-card` in `index.html`.
- **Creative tiles** — swap the placeholder blocks (`.project-media-fallback`, `.creative-item`) for real images.

> **Note:** The contact form and WhatsApp button use `mailto:`/WhatsApp deep links (no server-side sending). For true backend delivery, integrate a service like Formspree or EmailJS.

## 📬 Contact

- **Email:** jagadeesh901@gmail.com
- **LinkedIn:** [jagadeesh-babu-daggupati](https://www.linkedin.com/in/jagadeesh-babu-daggupati-179513273)
- **GitHub:** [@Jagadeeshd06](https://github.com/Jagadeeshd06)
- **Fiverr:** [@jagadeeshd901](https://www.fiverr.com/jagadeeshd901)
- **Instagram:** [@_jxgxdeezh_d_](https://www.instagram.com/_jxgxdeezh_d_)

## 📄 License

This project is available for personal/portfolio use. Add a license of your choice (e.g. MIT) if you'd like to open it up further.

---

Designed & built by **Jagadeesh D**
