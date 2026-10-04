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
| **3. V2 — Depth** | Professional Learning, The Program, My Story, Gallery | ⬜ Not started |
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

| Item | Plan | Status |
|---|---|---|
| Hero line | "Don't change the standard. Change the instructional method." | ✅ `src/lib/content/credentials.ts` |
| Positioning paragraph | First-person version of the strategy's positioning statement | ✅ |
| Voice | Warm, practical, story-led, first person | ✅ Copy pass done in PR #4 |
| Visual direction | Group and mixed-ability imagery; no studio clichés | ✅ Photos chosen for group moments |
| Palette | One accent from the Woodland HS logo + neutral base | 🟡 Accent palette in place; confirm it matches the logo, and check district rules before using the logo itself |
| CAN prominence | The NCAS project manager came out of the CAN network, so make CAN prominent | 🟡 One badge plus one sentence on Home; consider a stronger callout |

### Pages

#### 1. Home (`/`) — 🟡 mostly done

- ✅ Hero headline, subhead, CTAs (philosophy, CV & contact)
- ✅ Hero video loop: `winter-finale-loop.mp4` (Winter 2021 finale, trimmed)
- ✅ Credibility badges: GA Standards Writing Committee (2008), NDEO Presenter (2025), CAN National PLC, Barber MS Teacher of the Year (2007–08), and the new **Bartow County HS Teacher of the Year (2026–27)**, which isn't in the strategy doc
- ✅ Three group photos and "Explore" links to Standards and Dance for Every Body
- ⬜ Principal quote (Melinda Wilder) once received

#### 2. Standards & Leadership (`/standards-and-leadership`) — ✅ built, 🟡 verify facts

- ✅ Standards-writing experience (2008 GA DOE committee, GSE, Dance I–IV design)
- ✅ NCAS artistic processes table: Creating / Performing / Responding / Connecting
- ✅ Student choreography video (evidence for *Creating*) and three supporting photos
- ✅ Assessment philosophy (individual progress, not comparison)
- ✅ Technology & artistic literacy statement (fills the NCAS Technology & AI gap)
- ✅ "Commitment to service" paragraph
- ⬜ Short CAN action-research findings paragraph (after the Jan–May results are written up; see open decisions)
- 🟡 Tiffany to confirm the official committee name and the technology statement are accurate in her own words

#### 3. Teaching Philosophy (`/teaching-philosophy`) — 🟡 needs Tiffany's sign-off

- ✅ Philosophy statement (the strategy's draft, used as written)
- ✅ Five "Lessons learned as an educator" principles
- ⬜ Tiffany edits the draft so it sounds like her before launch

#### 4. Dance for Every Body (`/dance-for-every-body`) — 🟡 built, releases pending

- ✅ NDEO 2025 session title, description, Disability and Pedagogy track context
- ✅ Three strategies, each with one story
- ✅ Clapping-dance video (from the Eric story)
- ✅ Dance I etiquette Learning Ladder (8 rungs, as an ordered list)
- ✅ "Who benefits" for four audiences
- ✅ "More stories" (first names only)
- ⬜ Learning Ladder as a graphic instead of a list (nice to have)
- ⬜ Principal quote (optional second spot)
- 🔒/⚠️ **Confirm a signed media release** for the student in the clapping-dance video before launch; if it isn't confirmed, swap in a photo

#### 5. CV & Contact (`/contact`) — 🟡 mostly done

- ✅ Email (`mailto:`, address from env) and LinkedIn
- ✅ Experience, Education, Honors & service, Volunteering (newest first)
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
| Years teaching | "25+ years" everywhere | "25+" / "more than 25" | ✅ Consistent |
| GA committee name | Official name from the résumé | "Performance Standards Writing Committee for Dance Education" | ✅ Uses the official name |
| CAN dates | 2024–present | 2024–present | ✅ |
| Woodland role | 2020–present | 2020–present | ✅ |
| Red Door Food Pantry | Confirm 2012–2024 vs 2012–2025; co-director / board chair | "Board Member, 2020–2026" (LinkedIn) | ⬜ Tiffany confirms dates and title |
| Etowah Foundation | Confirm 2018 vs 2019 start | 2019–2025 | ⬜ Tiffany confirms |

---

## Phase 3 — V2 depth pages ⬜

Each new route needs: a `src/lib/nav.ts` entry, a smoke assertion in `tests/smoke/public.spec.ts`, a sitemap check, and a journey test if it's a real visitor flow ([post-deploy-tests](../../.cursor/rules/post-deploy-tests.mdc)).

| Page | Content (strategy §4.5–4.7) | Sources | Status |
|---|---|---|---|
| **Professional Learning** | Timeline: CAN 2024–present (two action-research cycles), NDEO 2025 presenter, NDEO 2017 sessions, OPDI 110 kinesiology (2018), Leadership Bartow (2018), Bartow Aspiring Leaders, CCSD Leadership Academy / Teacher Leader Institute, NDEO member since 2003. Training in Muhammad's 5 Pursuits and Liz Lerman's Critical Response Process. | CAN selection letter, CAN action plans, NDEO 2017 folder, OPDI 110 assignments | ⬜ |
| **The Program** (Woodland HS Dancing Wildcats) | Weekly structure (ballet / jazz / improv / daily conditioning), Dance I–IV mastery-based levels open to all students, Winter Concert 2025-26 photos by piece, student leadership story (with permission) | Syllabi, Winter Concert 2025-26 photo set | ⬜ |
| **My Story** | Dancing since 2, assistant teaching at 16; her father; Karina's Class origin; Leroy; Martha Graham; Cobb County program building; brief personal touches | 2020 Bartow bio, NDEO notes, NDEO deck photos (*My Dad and I*, *Karina's Class – The Beginning*) | ⬜ |
| **Gallery** | Curated photos and videos, captioned and **newest first** by event date | Website Credits and Gallery folder, Spring 2024 concert videos, Winter Concert 2025-26 | ⬜ |

Gallery build notes:

- Use a content collection with a quoted `date:` on every item and sort with `newestFirst()` ([newest-first](../../.cursor/rules/newest-first.mdc)).
- Convert HEIC to JPG and strip EXIF/GPS before committing.
- Confirm the event for every date-only filename before captioning (strategy §7.3 marks these as *likely*).
- Large videos (for example the ~500 MB May 2023 clip) need trimming and compressing, or external hosting. Don't commit raw files.
- Pull curated photos from the NDEO 2025 deck (.pptx export).

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
