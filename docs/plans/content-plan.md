# Content plan — tifftindall.com

Source: *Personal Brand Strategy & Content Inventory — Tiffany Tindall, Ed.S.* (prepared Oct 3, 2026, local-file version). The strategy document, `media_index.json`, and the raw media live in Tiffany's **Website Media** folder, **not** in this repo. It names students, diagnoses, and Drive links, so do not commit it.

**Goal:** a personal brand site that supports Tiffany's application to the **NCAS National Arts Standards review (Dance)** as a Writing Team Member / Discipline Lead.

| Key date | What |
|---|---|
| **Oct 18, 2026, midnight ET** | NCAS application deadline. The site URL goes on the application, so V1 must be live and reviewed before this. |
| Three years | NCAS project commitment. The site keeps growing through V2 and beyond. |

Status as of **Oct 4, 2026**. Legend: ✅ done · 🟡 partial / needs Tiffany's review · ⬜ not started · 🔒 Jeff only

---

## Phase overview

| Phase | Scope | Status |
|---|---|---|
| **1. Platform** | Astro scaffold, Azure Static Web Apps, Terraform, CI/CD, Playwright gates | ✅ Done (PR #2, #5, #6) |
| **2. V1 — NCAS launch** | Five priority pages: Home, Standards & Leadership, Teaching Philosophy, Dance for Every Body, CV & Contact | 🟡 Pages built (PR #4); content decisions and the launch checklist remain |
| **3. V2 — Depth** | Home, About, Leadership and Impact, Speaking and Workshops, Experience, Contact | 🟡 Pages built; draft copy needs Tiffany's review |
| **4. Later** | Testimonials, resources, possible "Work With Me", ongoing CAN research updates | ⬜ Not started |

---

## Phase 1 — Platform ✅

Done:

- ✅ Astro site, Tailwind styling, shared layout/nav/footer, SEO + Person JSON-LD
- ✅ Terraform under `infra/` with a separate tfstate; hosted in the shared company subscription ([subscription-hosting](../runbooks/subscription-hosting.md))
- ✅ `CI: static analysis` PR gate; `CD: main` with staging → **Verify Staging** → prod → **Smoke Production**
- ✅ Contact email kept out of git (`SITE_CONTACT_EMAIL` in `.env` / Key Vault)
- 🟡 Custom domain: `www` domain imported in Terraform; final cutover follows [custom-domain](../runbooks/custom-domain.md) 🔒

---

## Phase 2 — V1 NCAS launch (target: live before Oct 18)

### Brand foundations

The visual system and voice now follow the [brand style guide](../brand/style-guide.md) (Oct 4, 2026). It replaces the earlier "accent from the Woodland HS logo" plan: the brand uses no school colors, mascots, or logos.

| Item | Plan | Status |
|---|---|---|
| Positioning | "Award-winning educator and fine arts leader who works to make high-quality arts education available to every student" | ✅ Home opening line |
| Tagline | "Arts education for all." (style guide option 1) | ✅ Home `h1`, footer, page titles |
| Hero line | "Don't change the standard. Change the instructional method." | ✅ Moved to an indigo pull-quote band on Home |
| Palette | Midnight Indigo, Studio Teal, Spotlight Gold, Warm Ivory, Soft Stone, Charcoal | ✅ `src/styles/global.css`; Tailwind default colors turned off |
| Typography | Fraunces (headings) + Source Sans 3 (body), self-hosted | ✅ |
| Wordmark and monogram | Name + gold arc + "Arts Education Leader"; TT favicon | ✅ Coded wordmark; monogram favicon in outlined Fraunces (SVG + PNG). 🟡 Standalone wordmark files in all three versions (for LinkedIn, slides, print) still to produce |
| Arc motif, icons | Arc dividers and header shapes; Lucide outline icons with text labels | ✅ |
| Titles | Headings: "Arts Education Leader". Bios: "Dance Teacher and Fine Arts Department Lead" | ✅ Hero, Person schema. The CV entry uses "Dance Director & Fine Arts Department Lead" (Performing Arts Center Director dropped, Oct 5, 2026) |
| Proof points | Bartow County HS Teacher of the Year on the first screen (the Woodland HS honor stays in the Person schema only) | ✅ |
| Voice | Confident, warm, specific, first person | ✅ Copy pass done in PR #4; positioning updated to leadership framing |
| Visual direction | Group and mixed-ability imagery; no studio clichés | ✅ Photos chosen for group moments |
| CAN prominence | The NCAS project manager came out of the CAN network, so make CAN prominent | 🟡 One dated badge on Home (the separate sentence was removed); consider a stronger callout |

#### Brand decisions

Decided (Jeff, Oct 4, 2026):

- ✅ **Teal on ivory** (about 4.47:1) is accepted, and the palette stays as written.
- ✅ **CV title** is "Dance Director & Fine Arts Department Lead" (Performing Arts Center Director removed Oct 5).
- ✅ **Site structure** from the guide becomes the V2 plan (see Phase 3).

Still open:

1. **Degrees after her name** (M.S.Ed., Ed.S.). The guide limits them to résumés, speaker bios, and email signatures. The hero no longer shows "Ed.S."; the meta description and CV still do.
2. **Professional photo session** (guide shot list). The NDEO conference photo stands in for the headshot until then.
3. **Bios on file** in three lengths: one line, 50 words, 150 words.

### Pages

#### 1. Home (`/`) — 🟡 mostly done

- ✅ First screen per the style guide: tagline headline, positioning line, circular portrait, Bartow County Teacher of the Year honor, one gold CTA (philosophy) plus "My experience"
- ✅ Hero video loop: `winter-finale-loop.mp4` (Winter 2021 finale, trimmed)
- ✅ Pull quote band: "Don't change the standard. Change the instructional method."
- ✅ Leadership and recognition, newest first: Bartow County HS Teacher of the Year (2026–27), NDEO Presenter (2025), CAN National PLC (2024–present), Fine Arts Department Lead (2021–present), Barber MS Teacher of the Year (2007–08), GA Dance Power Standards Writing Committee (2005)
- ✅ Three group photos and "Explore" cards to About, Leadership and Impact, Speaking and Workshops, and Experience (Phase 3)
- ⬜ Principal quote (Melinda Wilder) once received

V1 URLs that moved in Phase 3 301 to their new homes: `/standards-and-leadership` → `/leadership-and-impact`, `/teaching-philosophy` → `/about`, `/dance-for-every-body` → `/leadership-and-impact/dance-for-every-body`. Use the new URLs on the NCAS application.

#### 2. Standards & Leadership (now part of `/leadership-and-impact`) — ✅ built, 🟡 verify facts

- ✅ Standards-writing experience (2005 GA DOE committee, GSE, Dance I–IV design)
- ✅ NCAS artistic processes table: Creating / Performing / Responding / Connecting
- ✅ Student choreography video (evidence for *Creating*) and three supporting photos
- ✅ Assessment philosophy (individual progress, not comparison)
- ✅ Technology & artistic literacy statement in Tiffany's words: reflective practices (video) and AI applications
- ✅ "Commitment to service" paragraph
- ✅ Oct 2026 corrections applied: two-cycle GCA grant, Power Standards committee name, 80/20 summative/supportive grading, full technique week, performances by level, Ailey and KSU field trips, no "at the barre"
- ⬜ Short CAN action-research findings paragraph (after the Jan–May results are written up; see open decisions)

#### 3. Teaching Philosophy (now part of `/about`) — ✅ Tiffany's words

- ✅ Three pedagogical priorities and closing paragraph from Tiffany's Teacher of the Year application
- ✅ Five "Lessons learned as an educator" principles
- ✅ "My story" is her professional biography, in first person
- ✅ Confirmed by Tiffany (Oct 2026): standards committee 2005, M.S.Ed. and Ed.S. in Educational Leadership, 30+ years of experience

#### 4. Dance for Every Body (`/leadership-and-impact/dance-for-every-body`) — 🟡 built, releases pending

- ✅ NDEO 2025 session title, description, Disability and Pedagogy track context
- ✅ Three strategies, each with one story
- ✅ Advanced class performance video ("Autocorrect Humanity," 2021), embedded from YouTube; replaced the clapping-dance clip in Oct 2026
- ✅ Caption describes the video: the advanced class performing their end-of-semester choreography project
- ✅ Dance I etiquette Learning Ladder (8 rungs, as an ordered list)
- ✅ "Who benefits" for four audiences
- ✅ "More stories" (first names only)
- ✅ NDEO 2025 slide deck available to download at the end of the page (`public/media/docs/dance-for-every-body-ndeo-2025.pdf`, smoke-tested)
- ⬜ Learning Ladder as a graphic instead of a list (nice to have)
- ⬜ Principal quote (optional second spot)
- ✅ Media releases cover the dancers in the embedded performance video (confirmed Oct 2026); captions name no students

#### 5. CV & Contact — 🟡 mostly done (split in Phase 3: CV on `/experience`, contact-only `/contact`)

- ✅ Email (`mailto:`, address from env) and LinkedIn on `/contact`
- ✅ Experience, Teacher of the Year, standards and national service, professional learning, education, community leadership on `/experience` (newest first)
- ✅ No home address or cell phone
- ⬜ Downloadable PDF résumé (the strategy asks for one)
- ⬜ Contact form (the strategy suggests one; `mailto:` is fine for V1). Adding a form means updating the Playwright contact assertions in the same change.

### Launch checklist (from strategy §9)

- [ ] Resolve inconsistencies (see the table below)
- [ ] Confirm media releases for every student shown on Home and Dance for Every Body
- [ ] Ask Principal Wilder for a 1–2 sentence quote
- [x] Write the Technology & AI statement (Tiffany to review the wording)
- [ ] Tiffany finalizes the teaching philosophy
- [x] Trim the Winter 2021 finale and clapping-dance videos to web clips
- [x] Build the V1 pages: Home · Standards & Leadership · Teaching Philosophy · Dance for Every Body · CV & Contact
- [ ] Jeff merges to `main`, staging verification passes, production is live on `tifftindall.com` 🔒
- [ ] Add the site URL to the [NCAS application](https://form.jotform.com/262435564526158) and submit before **Oct 18, midnight ET**

### Inconsistencies to resolve before launch

| Item | Strategy recommends | Site today | Action |
|---|---|---|---|
| Years teaching | "25+ years" everywhere | "30+" / "more than 30" | ✅ Updated to 30+ by Tiffany (Oct 2026) |
| GA committee name | Official name from the résumé | "Power Standards Writing Committee for Dance Education" | ✅ Corrected by Tiffany (Oct 2026) |
| CAN dates | 2024–present | 2024–present | ✅ |
| Woodland role | 2020–present | 2020–present | ✅ |
| Red Door Food Pantry | Confirm 2012–2024 vs 2012–2025; co-director / board chair | "Board Member, 2020–2026" (LinkedIn) | ⬜ Tiffany confirms dates and title |
| Etowah Foundation | Confirm 2018 vs 2019 start | 2019–2025 | ⬜ Tiffany confirms |

---

## Phase 3 — V2 depth pages 🟡

V2 moves the site to the [style guide's](../brand/style-guide.md) structure, with one change: the guide's Recognition page became **Experience**, a single CV page. The pages are **Home, About, Leadership and Impact, Speaking and Workshops, Experience, Contact**. There is no Gallery page; photos and videos live on the pages they support.

| Style guide page | URL | Built from | Status |
|---|---|---|---|
| Home | `/` | V1 Home; Explore cards now point to the four new sections | ✅ |
| About | `/about` | My Story + Teaching Philosophy (`#teaching-philosophy`; the Home gold button links there) | 🟡 My Story is a draft |
| Leadership and Impact | `/leadership-and-impact` | Department leadership, Standards & Leadership, The Program (framed as principles proven in three schools across Cobb and Bartow), Dance for Every Body summary | 🟡 Program copy needs review |
| ↳ Dance for Every Body | `/leadership-and-impact/dance-for-every-body` | V1 page, moved unchanged | 🟡 Releases pending (see Phase 2) |
| Speaking and Workshops | `/speaking-and-workshops` | NDEO 2025 session + slides, CAN 2024–25 action research, invitation to speak | ✅ |
| Experience | `/experience` | Every CV item: experience, Teacher of the Year honors, standards and national service, professional learning, education, community leadership | 🟡 Facts to confirm |
| Contact | `/contact` | Email and LinkedIn only, plus a link to Experience | ✅ |

Moved V1 URLs 301 in both `staticwebapp.config.json` files (see Phase 2). Nav is `src/lib/nav.ts`; the Dance for Every Body subpage is in `subpages` there so tests cover it. Smoke checks every route, the redirects (on SWA hosts), and the slides link; journeys `VISIT-02`–`VISIT-05` cover the new flows.

### Content sources and what's still missing

| Section | Content (strategy §4.5–4.7) | On the site | Still to do |
|---|---|---|---|
| **My Story** (About) | Dancing since 2, assistant teaching at 16; her father; Karina's Class origin; Leroy; Martha Graham; Cobb County program building; brief personal touches | Draft from CV facts only: dancing since 2, teaching at 16, UGA, Cobb County, Karina's Class, Reinhardt, Woodland | ⬜ Tiffany rewrites in her voice and adds her father, Leroy, and Martha Graham stories (sources: 2020 Bartow bio, NDEO notes, NDEO deck photos *My Dad and I*, *Karina's Class – The Beginning*) |
| **The Program** (Leadership and Impact) | Weekly structure (ballet / jazz / improv / daily conditioning), Dance I–IV mastery-based levels open to all students, Winter Concert 2025-26 photos by piece, student leadership story (with permission) | Four cards: open levels, weekly technique, every class performs, inclusive Dance I. Department leadership paragraph names all four arts. | ⬜ Winter Concert 2025-26 photos (media releases first) · ⬜ student leadership story (consent first) · 🟡 Tiffany confirms the department covers dance, music, theatre, and visual art |
| **Professional Learning** (Experience) | Timeline: CAN 2024–present (two action-research cycles), NDEO 2025 presenter, NDEO 2017 sessions, OPDI 110 kinesiology (2018), Leadership Bartow (2018), Bartow Aspiring Leaders, CCSD Leadership Academy / Teacher Leader Institute (2008), NDEO member since 2003. Training in Muhammad's 5 Pursuits and Liz Lerman's Critical Response Process. | Dated timeline, newest first; undated items under "Also trained in". NDEO presenter and CAN sit under "Standards and national service" | ⬜ NDEO 2017 left off until there's specific content (session title, presented or attended) · 🟡 OPDI 110 course title and the Aspiring Leaders date |
| **CAN action research** (Speaking and Workshops) | Two cycles | 2024–25 question and approach only | ⬜ Add 2024-25 findings; add the 2025-26 cycle once its question is written (see Content gaps) |

---

## Phase 4 — Later ⬜

- ⬜ **Testimonials:** 2–3 short quotes from her listed references
- ⬜ **CAN research updates:** 2024-25 findings, then the 2025-26 action plan as it progresses
- ⬜ **Resources:** Learning Ladder template
- ⬜ **Higher-ed evidence:** Reinhardt flash mob (2014) on Professional Learning or My Story
- ⬜ **"Work With Me"** (optional): based on her 2019 "Dance education advocate" concept

---

## Content gaps and decisions needed from Tiffany

1. **Principal quote** (Wilder) — Home and/or Dance for Every Body.
2. **CAN 2024-25 results** — the Jan–May sections (performance task, evidence, reflection) are blank. One "what I found" paragraph would strengthen the Standards page.
3. **Missing GoPro clips** — the "I'm Still Standing", hand-clap dance, and Karina's Class ("I See You in Everything") clips referenced in the NDEO notes aren't in Drive.
4. **Testimonials** — who to ask, and get their consent.
5. **Unknown-content media** — `IMG_2011.MOV`, undated `IMG_*` files (possible headshots), and several date-only photo clusters.
6. **Mary Poppins (Dec 2024)** — confirm her role before using those photos.

## Privacy and permissions (applies to every phase)

- Only show students with **current signed media releases**, following Bartow County policy for staff personal sites.
- First names or pseudonyms only. Don't name a diagnosis unless the family agrees.
- Stories the strategy marks ⚠️ (consent required) stay off the site until consent is confirmed.
- **Never publish** the story the strategy flags as "do not use publicly." If the theme is needed, describe it in general terms.
- Keep family mentions light; don't use her daughter's audition videos.
- Don't present another teacher's work (for example the BAMM curriculum map) as Tiffany's.
- No home address or cell number. Contact stays `mailto:` (address from env) or a future form.

## Housekeeping

- ✅ Removed the outdated hello-world scaffold wording from `README.md`, `CLAUDE.md`, `AGENTS.md`, `docs/`, and `.cursor/rules/`.
