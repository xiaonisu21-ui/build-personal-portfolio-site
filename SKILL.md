---
name: build-personal-portfolio-site
description: Build or update a bilingual, privacy-safe personal portfolio website from a resume, biography, case studies, or existing portfolio content. Use when someone wants a recruiter-facing personal site, a sanitized public demo, or a reusable portfolio site that can be exported as static files. Do not publish, invent achievements, or expose private information without explicit user approval.
---

# Build Personal Portfolio Site

Create a polished static portfolio that connects a person's positioning, capabilities, experience, evidence, and selected work. Use the bundled starter as the default visual system when the user has not supplied another reference.

## Choose the mode

- **Personal mode:** use only facts supplied by the user or supported by their source materials. Never invent employers, education, dates, metrics, credentials, testimonials, or project outcomes.
- **Fictional demo mode:** use clearly synthetic names, organizations, metrics, contacts, and imagery. Keep a visible “Fictional demo · AI-generated content” disclosure on the page.
- **Update mode:** preserve sections, working links, and content the user did not ask to change. Do not simplify an existing portfolio by silently removing material.

Ask only for information that materially changes the result. When a resume or existing site already answers a question, proceed without asking again.

## Workflow

1. Read [references/privacy-and-publishing.md](references/privacy-and-publishing.md) before creating public-facing content or preparing a deployment.
2. When using the bundled design, create a working copy with:

   ```bash
   node scripts/create_site.mjs --output /absolute/path/to/site
   ```

   The script refuses to overwrite an existing folder unless `--force` is explicitly supplied.
3. Read [references/content-model.md](references/content-model.md) and map the user's evidence into the content object in `content.js`.
4. Write the positioning before expanding sections. The hero should answer: who this person is, what they can do, and what evidence the visitor should inspect next.
5. Convert work history into concise, evidence-backed bullets. Prefer problem, method, and outcome over generic responsibility lists.
6. Build case studies around three fields: **problem**, **approach**, and **output/impact**. Mark anonymized or synthetic information accurately.
7. Produce Chinese and English versions when bilingual output is requested. Translate for professional meaning and natural tone; do not mechanically mirror Chinese sentence structure.
8. Replace `demo-avatar.png` only when the user supplies or approves another image. For fictional demos, use an AI-generated or clearly licensed image that does not resemble the user.
9. Run the validator before handoff or publication:

   ```bash
   node scripts/validate_site.mjs /absolute/path/to/site
   ```

10. Preview proportionally to risk. Check desktop and mobile layouts, language switching, case expansion, navigation, external links, and image loading.
11. Publish only when the user explicitly requests publishing and has selected or authorized a destination. A request to create or preview a site is not permission to make it public.

## Content rules

- Separate facts from interpretation. Strong wording is welcome; fabricated evidence is not.
- Do not convert missing information into fake achievements. Use a neutral omission or ask the user when the gap changes the site's credibility.
- Default to hiding phone numbers, exact home addresses, birth dates, identification numbers, private social accounts, private document links, access tokens, and raw client files.
- Use public professional contact channels only when the user explicitly wants them displayed.
- Preserve the user's industry and platform terminology when it is relevant to their positioning, but make capabilities understandable to cross-industry readers.
- Keep the first screen specific and compact. Avoid personality labels or self-descriptions that can unintentionally stereotype the user.
- For a public template or tutorial, replace all personal and client information with synthetic examples and disclose that clearly.

## Design rules

- Keep the starter's calm editorial system: restrained green accent, generous rhythm, readable type scale, rounded cards, and strong contrast.
- Maintain consistent section spacing. Do not alternate between cramped information grids and oversized empty areas.
- Use cards only when they improve scanning. Long experience and case content should expand or flow vertically instead of becoming dense equal-height grids.
- Keep the site responsive without hiding important content on mobile.
- Prefer code-native icons and simple CSS shapes. Avoid decorative images that do not add evidence or meaning.
- Every interactive element must have a visible label and keyboard-accessible behavior.

## Repository and deployment hygiene

- Publish static output or the sanitized starter, not the user's entire working directory.
- Exclude `.env*`, credentials, API tokens, private keys, `node_modules`, caches, local databases, raw resumes, private exports, client deliverables, and generated archives.
- Remove temporary preview URLs, signed query parameters, and platform login requirements from visitor-facing links.
- Treat deployment URLs as public. Re-run the privacy check immediately before publishing.

## Deliverables

Return the working site directory, validation result, and a concise list of public fields. If published, also return the verified URL and state any network or hosting limitations accurately.
