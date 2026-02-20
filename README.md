# Ashlyn Cassity Portfolio — Launch Guide

## What's in this folder

```
ashlyn-portfolio/
├── index.html              ← HTML entry point (has your meta tags + favicon)
├── package.json            ← Dependencies (React, Framer Motion, Vite)
├── vite.config.js          ← Build tool config
├── .gitignore              ← Keeps node_modules out of GitHub
├── src/
│   ├── main.jsx            ← React mount point
│   └── App.jsx             ← YOUR PORTFOLIO (this is the file you edit)
└── public/
    └── images/             ← PUT ALL YOUR IMAGES HERE
```

---

## STEP-BY-STEP LAUNCH

### Step 1: Install Node.js (if you don't have it)

Download from https://nodejs.org — grab the LTS version.
Verify it works by opening Terminal (Mac) or Command Prompt (Windows):

```bash
node --version
npm --version
```

Both should show version numbers.

---

### Step 2: Add your images

Copy ALL your portfolio images into the `public/images/` folder. This includes:

- All APEX images (APEX_91863.png through APEX_91869.png)
- All Veridian images
- All Moody, Mindfull, Blossm, MuteSix, Epic, LIV, Intrinsic, Editorial images
- Client logos (Asset_1_2x.png, Asset_3_2x.png, Asset_5_2x.png, Asset_7_2x.png, whiteclmbr_1.png)
- The Intrinsic SVG logo (Intrinsic_logo_outlined_2024_white.svg)
- Your logo mark (A_logo_mark.svg)
- Your headshot (envato-labs-image-edit.jpg)

The image paths in App.jsx reference `/images/filename.png` — which maps to `public/images/filename.png`.

---

### Step 3: Test locally

Open Terminal, navigate to this folder, and run:

```bash
cd ashlyn-portfolio
npm install
npm run dev
```

This starts a local server (usually http://localhost:5173). Open that URL in your browser to preview the site. Press Ctrl+C to stop.

---

### Step 4: Push to GitHub

1. Go to https://github.com/new
2. Create a new repository named `ashlyn-portfolio` (or whatever you like)
3. Keep it Public or Private — your choice (Vercel works with both)
4. Do NOT check "Add a README" (we already have files)
5. Click "Create repository"

GitHub will show you setup commands. In your Terminal, inside the project folder:

```bash
git init
git add .
git commit -m "Initial portfolio launch"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ashlyn-portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

### Step 5: Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New..." → "Project"
3. Find and select your `ashlyn-portfolio` repository
4. Vercel auto-detects Vite — leave all settings as default
5. Click "Deploy"

It builds in about 30-60 seconds. You'll get a live URL like:
`https://ashlyn-portfolio-xxxx.vercel.app`

---

### Step 6: Connect your custom domain

1. In Vercel, go to your project → Settings → Domains
2. Type in your domain name (e.g., `ashlyncassity.com`) and click Add
3. Vercel will show you DNS records to add. Go to wherever you bought your domain (GoDaddy, Namecheap, Google Domains, Cloudflare, etc.) and:
   - **Option A (recommended):** Add an A record pointing to `76.76.21.21`
   - **Option B:** Add a CNAME record pointing to `cname.vercel-dns.com`
4. If you want `www.ashlyncassity.com` too, add that as a second domain in Vercel — it'll redirect automatically
5. DNS propagation takes 5 minutes to 48 hours (usually under 30 minutes)
6. Vercel auto-provisions a free SSL certificate — your site will be HTTPS

---

## HOW TO EDIT AFTER LAUNCH

This is the beauty of this setup — editing is simple:

### Quick edits (text, images, content):
1. Open `src/App.jsx` in any text editor (VS Code recommended)
2. Make your changes
3. Test locally with `npm run dev` if you want to preview
4. Push to GitHub:
   ```bash
   git add .
   git commit -m "Updated case study content"
   git push
   ```
5. Vercel auto-deploys in ~30 seconds. Done.

### Adding new images:
1. Drop the image into `public/images/`
2. Reference it in App.jsx as `/images/your-new-image.png`
3. Push to GitHub — auto-deploys

### Bigger design changes later:
- Animations, hover states, layout changes — all happen in App.jsx
- You can add CSS files, split into components, add pages — it's a normal React project
- Every push to GitHub auto-deploys

---

## QUICK REFERENCE

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Run locally | `npm run dev` |
| Build for production | `npm run build` |
| Preview production build | `npm run preview` |
| Push changes live | `git add . && git commit -m "update" && git push` |

---

## NOTES

- **Favicon:** Uses your A_logo_mark.svg gradient logo
- **SEO:** Basic meta tags are in index.html — update the description as needed
- **Performance:** Vite produces optimized production builds automatically
- **Images:** For best performance, keep images under 1MB each. Use .webp if possible.
- **Future upgrades:** You can add React Router for proper URLs, add a CMS like Contentful for easier content editing, or migrate to Next.js for SEO benefits — all without starting over.
