# Step-by-step guide to complete the Ensemble website

Use this checklist in order. Each step is scoped so you can do one at a time.

---

## Phase 1: Fix technical issues (do first)

### Step 1.1 – Fix page transition + Locomotive Scroll
On route change, the transition tries to reset scroll using `window.locomotiveScrollInstance`, but the real instance is stored as `window.locomotiveScroll`. Update `PageTransition.jsx` to use `window.locomotiveScroll` everywhere instead of `window.locomotiveScrollInstance` so scroll resets correctly on navigation.

### Step 1.2 – Ensure fonts load
`index.css` references `/fonts/` (Antique Olive, Matter). Add the font files under `public/fonts/` or replace the paths if they live elsewhere. Without them, fallback fonts will be used.

### Step 1.3 – Contact form: connect to a backend or email
The Contact form only simulates submit (logs to console). Choose one:
- **Option A:** Use a form service (e.g. Formspree, Netlify Forms, Getform) and set the form `action` and `method`, or submit via `fetch` to their endpoint.
- **Option B:** Add a small backend (e.g. serverless function) that sends email and point the form there.

Until then, keep the success message so users get feedback; replace the “simulate” logic with the real submit.

---

## Phase 2: Legal and footer links

### Step 2.1 – Privacy, Terms, Disclaimer pages
Footer links go to `/privacy`, `/terms`, `/disclaimer` but those routes don’t exist. Either:
- Add three simple pages (e.g. `Privacy.jsx`, `Terms.jsx`, `Disclaimer.jsx`) and routes in `App.jsx`, and put your real legal text (or placeholders), or  
- Point the footer links to external URLs if the content lives elsewhere.

### Step 2.2 – Footer: real links
Replace placeholder links in the main Footer component:
- **Social links:** Replace each `href="#"` with your real Facebook, Instagram, LinkedIn, YouTube (or remove if you don’t use them).
- **Address/phone:** Already have placeholders; replace with real contact details.
- **Language links:** If you only have one language, remove the language switcher or link both to the same page.

### Step 2.3 – Optional extra routes
`navigation.js` references `/careers`, `/resources`, `/newsletter`. Decide:
- If you want those pages: add components and routes in `App.jsx`, then use the existing nav/footer links.
- If not: change those entries in `navigation.js` (and any footer that uses them) to existing routes or remove the links.

---

## Phase 3: Content and assets

### Step 3.1 – Hero
- **Video:** Hero uses a `<video>` with an empty `src`. Add a real MP4 (or other format) in `public/` and set `<source src="/your-video.mp4" />`, or remove the video block and rely on the gradient overlay if you prefer a static hero.
- **Trust logos:** Replace the placeholder entries in `content.js` (`heroContent.trustLogos`) with real client/partner logos: add image paths (e.g. in `public/assets/`) and update the Hero section to render `<img>` with those paths instead of the “Logo 1” text placeholders.

### Step 3.2 – Case studies
- In `content.js` (or your case study data source), ensure each case study has: title, client, slug, description, category, results, and at least one image or media URL.
- Open a few case study detail pages and confirm images and copy look correct. Add or fix images in `public/` and paths in the data.

### Step 3.3 – About page
- **Team:** Replace placeholder team data with real names, roles, and photos (paths in `public/` or from your CMS).
- **Mission/values:** Replace any generic or “lorem” text with your real mission and values.

### Step 3.4 – Insights / blog
- Right now there are only a few sample insights and no detail page. Either:
  - Add an Insight detail page and route (e.g. `/insights/:slug`) and wire cards to it, or  
  - Keep a single list view and link cards to external posts (e.g. Medium) or another CMS.
- Replace sample titles and excerpts with real articles (or remove extra samples).

### Step 3.5 – Other sections
- **How We Work / Process:** Replace any “placeholder” text or generic labels with your real process steps and descriptions.
- **Page4 (Featured Insights):** Replace `href="#"` with real links (e.g. to `/insights` or specific insight URLs).
- **Testimonials:** Ensure names, roles, companies, and quotes in content/data match real clients (or clearly marked as examples).

---

## Phase 4: Newsletter and small features

### Step 4.1 – Footer newsletter
The newsletter block is just an input with no behavior. Either:
- Add a form that submits to your email tool (Mailchimp, ConvertKit, etc.) using their embed or API, or  
- Add a small backend/serverless endpoint that subscribes the email and wire the form to it.

### Step 4.2 – Contact page map
Replace the “Map placeholder” with a real map:
- Embed Google Maps (or similar) iframe, or  
- Use a map component/library and your address. Remove the placeholder text once the map is in place.

---

## Phase 5: Final polish

### Step 5.1 – Copy and SEO
- Go through every page and replace remaining placeholder or generic copy with your real messaging.
- Add or adjust `<title>` and meta tags per page (e.g. React Helmet or your layout) for better SEO and sharing.

### Step 5.2 – Favicon and PWA (optional)
- Replace the default Vite favicon in `index.html` with your Ensemble favicon.
- Add a proper `apple-touch-icon` and any PWA manifest if you want installability.

### Step 5.3 – Proof and test
- Click every link (nav, footer, CTAs, cards) and fix 404s and wrong routes.
- Test the contact form and newsletter with real submissions.
- Test on mobile and with “Reduce motion” on to ensure nothing breaks.
- Run a production build (`npm run build`) and fix any build errors or missing assets.

---

## Quick reference: what’s already in place

- **Routes:** Home, Case Studies, Case Study Detail, Services, About, Insights, Contact.
- **Contact form:** Validation and success message; only the “send” part is simulated.
- **Content data:** `src/lib/content.js` and `src/data/` have structure for case studies, services, testimonials, etc.; needs your real copy and assets.
- **Animations:** GSAP, Locomotive Scroll, and reduced-motion handling are wired; only the PageTransition ↔ Locomotive global name needs fixing (Step 1.1).

Start with **Phase 1** so the site behaves correctly, then **Phase 2** so all links work, then fill in **Phase 3–5** with your real content and integrations.
