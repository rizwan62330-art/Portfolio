# M. Rizwan — Portfolio

A modern 3D interactive portfolio built with **React + Vite + Three.js**.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Cursor.jsx / .css       ← Custom animated cursor
│   ├── Navbar.jsx / .css       ← Sticky frosted-glass nav
│   ├── Hero.jsx   / .css       ← 3D Three.js hero + typewriter
│   ├── About.jsx  / .css       ← Bio, photo, highlights
│   ├── Projects.jsx / .css     ← Tilt cards with tech tags
│   ├── Skills.jsx / .css       ← Categorized skill pills
│   ├── Contact.jsx / .css      ← Form + social links
│   └── Footer.jsx / .css       ← Footer
├── assets/                     ← Put your photo here
├── App.jsx                     ← Root component
├── main.jsx                    ← Entry point
└── index.css                   ← Global design tokens
```

## ✏️ Personalising

### 1. Add your photo
Replace the placeholder in `About.jsx`:
```jsx
// Find this line:
<div className="about-img-placeholder">👨‍💻</div>

// Replace with:
<img src="/src/assets/YOUR_PHOTO.jpg" alt="Rizwan" className="about-img" />
```

### 2. Update your projects
Edit the `PROJECTS` array in `Projects.jsx` — add real GitHub links, descriptions, and tech tags.

### 3. Update your social links
In `Contact.jsx`, update the `href` values for GitHub, LinkedIn, and your email address.

### 4. Update stats
In `Hero.jsx`, change the numbers in the `.hero-stats` section to reflect your real counts.

## 🏗️ Build for Production

```bash
npm run build
# Output goes to /dist — deploy to Netlify, Vercel, or GitHub Pages
```

## 🎨 Theming

All design tokens are CSS variables in `src/index.css`:
```css
--accent:  #6c63ff   /* Purple — primary accent */
--accent2: #00d4ff   /* Cyan — secondary accent  */
--green:   #00c896   /* Status / expert level    */
--gold:    #f5a623   /* Featured / learning level */
```
Change `--accent` to any color to instantly re-theme the entire site.
