# Session handoff — portfolio redesign

Written 2026-08-13 at the end of the Next.js rebuild session, so a fresh chat can
pick up the redesign without re-deriving anything.

**Your opening message in the new chat can just be:**

> Read HANDOFF.md, then redesign the whole app using the skills in `.claude/skills/`.

---

## 0. Why this file exists

The `.claude/skills/` folder was added **mid-session**. Claude Code only scans
that folder when a session starts, so those skills were not invocable — they had
to be read as plain files instead. A fresh session indexes them properly and they
become available as `/bencium-impact-designer`, `/design-audit`, `/typography`, etc.

Restarting costs the conversation context. This file is that context.

---

## 1. Where things stand

| | |
| --- | --- |
| Branch | `redesign-instrument` (off `redesign`) |
| Fallback | `redesign` @ `f77013f` — the lime/Bricolage build, untouched |
| Old vanilla site | branch `main`, commit `f1dae09` (recover: `git show f1dae09:index.html`) |
| Build | passes, all routes static |
| Lint | passes, 0 warnings |
| Dev | `npm run dev` → `http://localhost:3000` |

**Two rounds are done: the redesign in §5, then the September 2026 content and
structure pass in §12.** Direction, chosen by the user from three
options: **Technical Instrument** — dark-first warm palette, choreographed
motion, reskin + relayout with the section order and the content layer
untouched. See §11 for what that means concretely.

**Stack:** Next.js 16.3.0 (App Router, Turbopack) · React 19.2.8 · TypeScript ·
Tailwind **v4** (CSS-first, no `tailwind.config.js`) · `motion` 13 · `lucide-react` 1.31 ·
`@emailjs/browser` 4.

---

## 2. What happened in the previous session

Two things, in order:

**(a) Audited the original vanilla site** (653-line `index.html`, 3097-line
`style.css`, ~2100 lines of JS). Findings that drove the rebuild:

- ~1450 lines of CSS (`css/animations.css`, `css/responsive.css`) were **never
  linked** from the HTML — dead files being edited to no effect
- **Three competing typing animations** fighting over one element
- **particles.js initialised twice**, and re-initialised on every resize without
  teardown (leaked canvases + rAF loops)
- Service worker registered `/sw.js`, which didn't exist → console error every load
- Favicon 404
- A **fake loading screen** adding an artificial 3–6 s delay before content
- Fabricated content: fake credential IDs (`AWS-12345`) next to "✓ Verified"
  badges, invented accuracy percentages, made-up testimonials, wrong GitHub/LinkedIn URLs

**(b) Rebuilt it** as Next.js + Tailwind, per the user's chosen options: Next.js +
Tailwind stack, "bold & expressive" visual direction, and all four fix areas
(content accuracy, SEO, accessibility, performance).

---

## 3. Architecture — read this before changing anything

```text
src/
  content/          ← ALL copy and data lives here. Components never hardcode copy.
    types.ts          shapes; icons are string keys, not JSX
    profile.ts        name, roles, socials, DERIVED section list, headline stats
    experience.ts     roles, leadership, volunteering + recognition
    projects.ts       engineering work (each id doubles as a /work/<slug>)
    skills.ts         skill groups + certifications
    services.ts       freelance offer — SHIPS EMPTY, see §12
  components/
    sections/       one file per page section
    ui/             reveal, section, marquee, count-up, icon, brand-icons
    site-nav.tsx    header, scroll spy, mobile menu, theme toggle
    site-footer.tsx
    theme-script.tsx  inline no-flash theme script
  app/
    layout.tsx      fonts, metadata, viewport
    page.tsx        section order + JSON-LD Person schema
    work/[slug]/    per-project case studies, prerendered
    globals.css     ALL design tokens live here (Tailwind v4 @theme)
    opengraph-image.tsx / icon.tsx    generated at build time
    robots.ts / sitemap.ts
```

**A redesign should mostly touch `globals.css` + `components/`. It should not need
to touch `content/`** — that separation is the main win of the rebuild, keep it.
A *content* change is the mirror image: it should only touch `content/`.

---

## 4. Decisions with reasons — don't silently undo these

These were deliberate and several were bug fixes found by testing in a real browser.
If the redesign changes them, change them *knowingly*.

1. **`--accent` vs `--accent-fill` are two different tokens.**
   `--accent` is text-safe; `--accent-fill` is the button/chip surface. They differ
   in light mode because accent type on a near-white page is unreadable — the old
   lime measured ~1.5:1, the current amber `#ff6b2c` measures 2.6:1. Light
   `--accent` drops to a burnt rust `#9c3a10` = 6.2:1. **Any new palette needs the
   same split or an equivalent guarantee.**

2. **Scroll spy is position-based, not IntersectionObserver.**
   Comparing `intersectionRatio` across sections is wrong — ratio is relative to
   each element's own height, so a short section always outranks the tall one
   you're reading. It highlighted the wrong nav item. Current version picks the
   last section whose top passed a line 30% down the viewport, batched in one rAF.

3. **The hero role rotator cross-fades; it must not use `AnimatePresence mode="wait"`.**
   With `mode="wait"` the line went visibly blank between every swap. Elements are
   absolutely positioned so they overlap. Verified: 0 blank frames in 14 samples.

4. **`data-theme` on `<html>` is the single source of truth**, written by an inline
   script in `<head>` before first paint (no flash). The toggle reads it via
   `useSyncExternalStore` + MutationObserver — *not* mirrored into state from an
   effect, because React 19's lint rule `react-hooks/set-state-in-effect` errors on that.

5. **`CountUp` derives the reduced-motion value during render**, same lint rule.

6. **Content-accuracy rules encoded in the data model — do not reinstate:**
   - `Project.metrics` = only numbers reproducible from the repo. Empty array →
     renders nothing. That's the intended fallback, not a gap to fill.
   - `Certification.credentialUrl` drives the "Verify" link. No URL → no link.
     **Never re-add a "Verified" badge without a real URL behind it.**
   - Testimonials were fabricated and were deleted. Don't bring them back.
   - Design projects with no public link render no CTA rather than `href="#"`.
   - `Certification.date` is optional and omitted where the date isn't recorded.
     An invented year is the same failure mode as an invented credential ID.
   - `services.ts` ships as an empty array. The Services section, its nav entry
     and its plate number all appear together the moment it has real entries.

7. **Zero third-party requests.** Fonts self-hosted via `next/font`, icons are
   `lucide-react` + inline SVG brand marks. The old site pulled from cdnjs, unpkg,
   jsdelivr and Google Fonts. Measured: 12 requests, one host, 330 KB over the
   wire, DOMContentLoaded 43 ms. **Keep this property.**

---

## 5. ✅ RESOLVED — the skills contradicted the *old* design

This is the crux of the redesign. `bencium-impact-designer/SKILL.md` explicitly
bans things currently in the codebase:

Every violation below has been removed. Left here so nobody reintroduces one.

| Skill says NEVER | Was | Now |
| --- | --- | --- |
| Inter as a primary font | body font in `layout.tsx` | IBM Plex Sans |
| Space Grotesk / AI-favourite grotesks | Bricolage Grotesque display | Archivo, set on its `wdth` axis |
| "liquid/blob backgrounds" | two blurred drifting orbs, `@keyframes blob-drift` | drafting grid + a 1px oscilloscope sweep |
| Glass morphism | `backdrop-blur-xl` nav, blurred back-to-top | solid `--ink` with a hairline rule |
| Generic SaaS blue, purple-on-white | not used | still not used |

Kept from the old build, deliberately: the grain overlay, the marquee, the
numbered section headers, the content/presentation split, and every item in §4.

---

## 6. The skills, and what each is for

Located in `.claude/skills/`. All read in the previous session except where noted.

| Skill | Use for this task? |
| --- | --- |
| `bencium-impact-designer` (988 ln) | **Primary.** Most complete. Bold commitment, ~45 "tone extremes" to pick from, anti-AI-slop rules. |
| `bencium-innovative-ux-designer` (718 ln) | Overlaps heavily with the above; more a11y emphasis. Pick one, not both. |
| `bencium-controlled-ux-designer` (738 ln) | Same family, but "ALWAYS ASK before any design decision". Use if the user wants tight control. |
| `design-audit` (123 ln) | Audit current UI → phased implementation plan. Good **first** step. |
| `typography` (344 ln) | **ENFORCEMENT MODE — always apply.** Curly quotes, proper dashes, tracking. Auto-apply, don't ask. |
| `relationship-design` (331 ln) | **Not applicable.** Its own description says only use when explicitly asked for agentic/memory UX. A portfolio isn't that. |

Supporting files per bencium skill: `MOTION-SPEC.md`, `ACCESSIBILITY.md`,
`RESPONSIVE-DESIGN.md`, `DESIGN-SYSTEM-TEMPLATE.md`. **Not yet read** — read them
in the new session.

**All three bencium skills require asking the user for direction before
implementing.** Expect to ask about: tone/aesthetic extreme, colour temperature
(warm vs cool), type personality, motion philosophy, density.

### Typography — done, keep it that way

Every `&apos;` escape is gone; visible text uses real `’` (U+2019) characters,
including `SVKM’s` in `content/profile.ts`. Dashes in `content/*` were already
correct em/en dashes. **Do not reintroduce `&apos;` or straight quotes** — in JSX
text, paste the real character; `’` renders literally between tags.

---

## 7. Open decisions the user still owes an answer on

1. **Deployment target.** `output: "export"` is deliberately NOT set. As-is it's
   Vercel-ready; GitHub Pages (where the old site lived, `dhruvsharma-05.github.io`)
   needs `output: "export"` + `images.unoptimized`. Both documented in README.
2. **The About prose is Claude's writing**, not the user's voice
   (`components/sections/about.tsx` — "the last mile", "same problem, different end
   of the pipe"). He should rewrite or approve it.
3. **EmailJS domain allowlist** must be locked to the real domain in the EmailJS
   dashboard, or anyone can burn the quota. Keys are in `.env.local` (gitignored);
   `.env.example` documents them.
4. **Unverifiable metrics were removed** (`94.2%`, `87.5%`, `91.3%` accuracy).
   If he has real numbers, add them back to `Project.metrics`.
5. No resume PDF exists anywhere on the site. Probably should.

---

## 8. How to verify work (this is already proven to work)

Playwright browsers are cached at `~/AppData/Local/ms-playwright`. Chrome and Edge
are both installed. Previous session drove the real site like this:

```bash
npm run build && npx next start -p 4315
# separate dir, so the project stays clean:
npm i playwright-core
```

```js
const { chromium } = require("playwright-core");
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"dark" });
```

Gotchas learned the hard way:

- Chrome's `--headless --screenshot` fires **mid-animation** and shows blank
  sections. Use Playwright with an explicit wait, not the CLI flag.
- Playwright's default `colorScheme` is **light**, which is why the first
  screenshots came out in the light theme.
- Don't name a variable `URL` in the script — it shadows the global constructor
  and silently zeroes the resource measurements.
- `page.locator("header")` matches 7 elements (each `SectionHeader` renders a
  `<header>`). Use `getByRole("banner")` for the site nav.
- Disable smooth scrolling before screenshotting:
  `page.addStyleTag({ content: "html{scroll-behavior:auto !important}" })`

Checks worth re-running after the redesign: console errors, first tab stop is
"Skip to content", reduced-motion renders content at opacity 1, over-the-wire
transfer, and colour contrast on **both** themes.

---

## 9. Environment gotchas

- **Next 16**, not 15. `next dev` uses Turbopack by default.
- `LayoutProps<"/">` is a Next-generated global that only exists after a build —
  `layout.tsx` types props explicitly instead.
- **lucide-react v1 removed all brand icons.** GitHub / LinkedIn / Figma / Drive
  are hand-inlined SVG in `components/ui/brand-icons.tsx`. Don't import them from lucide.
- React 19 lint is strict about `setState` in effects (see §4.4, §4.5).
- `AGENTS.md` / `CLAUDE.md` are **generated by `next dev`** and re-created if
  deleted. Leave them committed.
- `.gitignore` has `.env*` plus a `!.env.example` negation.
- Shell is Git Bash on Windows; PowerShell also available.

---

## 10. Verified state of the redesign

Measured in Chrome via Playwright at 1440×900 and 390×844, both themes:

- 0 console errors, dark and light
- first tab stop is "Skip to content"
- 13 requests, **one host**, 380 KB over the wire — the zero-third-party
  property in §4.7 holds
- `prefers-reduced-motion`: every card renders at opacity 1
- no horizontal overflow at 390px
- `getByRole("banner")` matches exactly 1
- **colour contrast: 0 elements below WCAG AA on either theme.** One reported
  failure is a false positive — the active project filter's orange fill is
  painted by an absolutely-positioned sibling the audit walker can't resolve;
  the real pair (`--accent-ink` on `--accent-fill`) is 6.6:1.

Two stacking bugs were found and fixed by looking at real screenshots, not by
reasoning: **`-z-10` decoration vanishes unless its parent is `isolate`d.** It
drops behind the page background rather than sitting behind the content. This hit
the hero drafting grid (invisible) and the active filter pill (orange fill gone,
near-black label on a near-black ground). Both now carry `isolate`. If you add a
`-z-10` layer anywhere, isolate its parent.

---

## 11. The Technical Instrument system

**Concept.** The page is an instrument panel: a drafting grid, hairline rules,
registration marks, mono metadata, and one signal colour. Depth comes from the
surface step and rule weight, never from shadow or blur.

**Type.** Three faces, two voices.
`Archivo` (display) carries a real `wdth` axis — set through
`font-variation-settings`, not `font-stretch`, because next/font emits no
`font-stretch` range descriptor and the property would silently no-op. The
`type-wide` / `type-wide-md` / `type-panel` utilities in `globals.css` each set
both axes, since `font-variation-settings` overrides `font-weight`.
`IBM Plex Sans` + `IBM Plex Mono` share a skeleton, so a mono readout sits
optically level with the sans paragraph beside it.

**Palette.** Warm graphite, dark-first. Amber `#ff6b2c` is the one signal colour.
`--trace` (cyan) is decoration and readouts only — never a second call to action,
or the panel stops having one signal. Every token in `globals.css` carries its
measured contrast ratio in a comment; keep that up to date if you change one.

**Primitives** — `src/components/ui/panel.tsx`:
`Panel` (hairline box, square corners, `ticks` registration marks on hover),
`PanelHead` (mono caption bar), `SpecRow` (label · dotted leader · value),
`Tag` (square chip), `GridField` (masked drafting grid).

**Radius.** `--radius-sharp: 2px` is the largest radius on the site. There are no
`rounded-full` pills left.

**Motion.** Choreographed: one staggered hero load (~90ms steps), scroll-triggered
section entrances with 18px travel, counters on view, a 9s sweep line, a 50s
telemetry marquee. Transform and opacity only.


---

## 12. September 2026 — content and structure pass

Driven by an updated resume. The user also said they had **started freelancing**,
which appears nowhere in that resume, so the Services work is scaffolded but not
populated (see "Still blocked" below).

### Positioning changed

The site led with "Web Analyst & Data Science". It now leads with **AI Engineer**,
because RevClerx is the current and most substantial role. Changed: page title,
meta description, keywords, the OG card, `jobTitle` and `knowsAbout` in the
Person JSON-LD, `profile.roles`, `profile.headline`, `profile.summary`, and the
About prose.

### Structure changed

| | Before | After |
| --- | --- | --- |
| Sections | About · Experience · Work · Design · Skills · Contact | About · Experience · Work · Contact |
| Design section | 5 case studies | **cut** |
| Skills section | its own section | **merged into About** as "Toolkit" |
| Certifications | inside Skills | moved into Experience |
| Case studies | none | `/work/<slug>`, one per project, prerendered |

**Section numbering is now derived.** `profile.ts` builds `sections` from an
order list and computes `01`…`0n`; `SectionHeader` looks its own index up by
`id` rather than taking one as a prop. Cutting or reordering a section renumbers
the plate headers, the nav and the left rail from that one list. Don't reintroduce
a hard-coded `index` prop.

### What the Design cut lost, and what was kept

`content/design.ts` is deleted — recover with
`git show f77013f:src/content/design.ts`. Three Figma links died with it (Nike
redesign, Headphone Store, NMIMS Canteen). Two were **preserved by moving them
onto the entries they actually belong to**:

- the Drive collection → the Creative Designer and Anviksha experience entries
- the BUILD Figma file → the Unstop hackathon achievement (it is literally the
  artefact from that hackathon)

`EntryLink` on `Experience` and `Achievement` is what carries them.

### Case studies

`app/work/[slug]/page.tsx`. `params` is a **Promise** in Next 16 and must be
awaited. `PageProps<'/work/[slug]'>` is a Next-generated global that only exists
after a build, so params are typed explicitly — same reason `layout.tsx` does.
`dynamicParams = false` makes an unknown slug a static 404 and keeps the route
compatible with `output: "export"`.

Each page carries its own title, description, canonical, OG tags and
`SoftwareSourceCode` JSON-LD, and gets a `sitemap.ts` entry.

The home card's **title** is the link, using `after:absolute after:inset-0` to
make the whole panel one hit target; the action buttons sit at `relative z-10`
so they stay independently clickable through that overlay.

Footer links are now `/#<section>` rather than `#<section>`, so they resolve
from `/work/<slug>` too. The footer's home link uses `next/link` —
`@next/next/no-html-link-for-pages` errors on a bare `<a href="/">`.

### Verified

Home + two case studies, dark and light, 1440×900 / 390×844 / 320px:

- 0 console errors, 0 page errors
- nav renders exactly About · Experience · Work · Contact; plates run 01–04
- Services correctly absent while `services.ts` is empty
- all 5 case studies return 200 with correct titles, canonicals and JSON-LD;
  an unknown slug returns 404; sitemap lists 6 URLs
- every navigation path round-trips: card button, card title overlay, All work,
  prev/next, and a footer anchor from a subpage back to `/#experience`
- reduced motion renders at opacity 1; no horizontal overflow
- **0 elements below WCAG AA** on either theme across all three pages (the
  active filter button still reports as a false positive — its fill is painted
  by a sibling the audit walker can't resolve; the real pair is 6.6:1)

One real bug caught only by screenshotting: the case-study `<h1>` was **clipped**
at 390px. `overflow-hidden` on the section meant the document-overflow check
passed while the text was actually cut off. Fixed by stacking the icon above the
title below `sm` and stepping the title down to `--text-display-sm` there.
**A document-level overflow check does not catch clipping inside an
`overflow-hidden` container — compare `scrollWidth` to `clientWidth` on the
element itself.**

### Still blocked — needs the user

1. **Freelancing has no data.** `content/services.ts` is an empty array with a
   documented shape. Fill it and the section, its nav entry and its plate number
   appear automatically. Never invent a `rateBand`.
2. **RevClerx end date.** The resume says "Jan 2025 - Present" and the site says
   the same, but the file was named `(old2)` and the user described the
   internship in the past tense while saying they had started freelancing. If it
   has ended, `content/experience.ts` and the About prose both need the real date.
3. **Certification issuers and dates.** Taken from the resume, which gives no
   dates. Four have `date: "2024"` carried over from the previous build; four
   have none. The Power BI cert's issuer changed from Microsoft to Coursera to
   match the resume. No `credentialUrl` is set on any of the eight, so none shows
   a Verify link.
4. **The leadership bullets exceed the resume.** The Student Placement
   Coordinator and Creative Designer entries were written in an earlier session
   and carry more detail than the resume supports. Left as-is because they
   shipped and the user has seen them — but they are worth a read-through.
