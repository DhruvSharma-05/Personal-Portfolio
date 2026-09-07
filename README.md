# Dhruv Sharma — Portfolio

Personal portfolio site. Next.js App Router, TypeScript, Tailwind v4, Motion.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
```

| Script          | What it does                        |
| --------------- | ----------------------------------- |
| `npm run dev`   | Dev server (Turbopack)              |
| `npm run build` | Production build                    |
| `npm start`     | Serve the production build          |
| `npm run lint`  | ESLint                              |

## How it's laid out

```text
src/
  content/          All copy and data. Edit here, not in components.
    profile.ts        Name, roles, socials, section list, headline stats
    experience.ts     Roles + recognition
    projects.ts       Engineering work
    design.ts         Design case studies
    skills.ts         Skill groups + certifications
    types.ts          Shapes for everything above
  components/
    sections/       One file per page section
    ui/             Reveal, Section, Marquee, CountUp, Icon, brand SVGs
    site-nav.tsx    Header, scroll spy, mobile menu, theme toggle
  app/
    layout.tsx      Fonts, metadata, theme script
    page.tsx        Section order + JSON-LD Person schema
    opengraph-image.tsx / icon.tsx    Generated at build time
    robots.ts / sitemap.ts
```

**To change content, edit `src/content/*`.** Components read from there; none of the
copy is hardcoded in JSX except the About prose.

## Content rules worth keeping

Two conventions in the data exist to stop the site making claims it can't back:

- `Project.metrics` is for numbers reproducible from the repo. Descriptive
  claims go in `features`. An empty array renders no metrics block — that's the
  intended fallback, not a gap to fill.
- `Certification.credentialUrl` drives the "Verify" link. No URL, no link. Don't
  reinstate a "Verified" badge without a URL behind it.

## Theming

Dark by default, light available. `data-theme` on `<html>` is the source of
truth, written by an inline script in `<head>` before first paint so there's no
flash. Colours are CSS custom properties in `globals.css` — `--accent` is the
text-safe tone, `--accent-fill` is the button/chip surface. They differ in light
mode because lime type on a near-white page fails contrast.

## Deployment

The build is fully static — every route prerenders, no server runtime needed.

**Vercel** (recommended): import the repo, add the `.env.example` variables in
project settings, done.

**GitHub Pages** (where the old site lived): add static export to
`next.config.ts`:

```ts
const nextConfig: NextConfig = { output: "export", images: { unoptimized: true } };
```

Then `npm run build` emits `out/`, which you publish via GitHub Actions or the
`gh-pages` branch. Set `NEXT_PUBLIC_SITE_URL` to the deployed origin either way —
it drives `metadataBase`, the canonical URL, `sitemap.xml` and the JSON-LD.

## Contact form

Uses EmailJS from the browser. The three `NEXT_PUBLIC_EMAILJS_*` values are
public by design — EmailJS authorises requests against the domain allowlist on
the service, not the key. Lock that allowlist down to your real domain in the
EmailJS dashboard, or anyone can send through your quota.

If the variables are unset, the form doesn't break: it tells the visitor to email
directly instead.

## Predecessor

The previous vanilla HTML/CSS/JS site is on the `main` branch at commit
`f1dae09`. Recover any of it with:

```bash
git show f1dae09:index.html
```
