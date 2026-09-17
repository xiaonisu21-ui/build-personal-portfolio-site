# Portfolio content model

Use `content.js` as the single source of truth. It exports `window.portfolioContent` with three top-level keys:

- `meta`: language-independent settings and links.
- `zh`: Chinese content.
- `en`: English content.

Keep the two language objects structurally identical. Each locale should contain:

- `nav`: navigation labels.
- `hero`: name, role, statement, summary, highlights and calls to action.
- `skills`: 4–8 evidence-oriented capability cards.
- `experience`: reverse-chronological roles with scope, actions and outcomes.
- `cases`: 3–6 case studies with context, problem, approach, outcome and evidence status.
- `project`: one featured product or independent project.
- `journey`: a short, privacy-safe professional trajectory.
- `education`: education and optional credentials.
- `traits` and `interests`: concise personal signals, not a biography.
- `contact`: safe public contact copy.

## Evidence rules

1. Separate facts, estimates and fictional demonstration data.
2. Never invent employers, outcomes or metrics for a real person.
3. If exact numbers are confidential, use an approved range or qualitative impact and label it.
4. A case study is ready only when a reader can identify the problem, the person's contribution, the method and the result.
5. Prefer 3 strong cases over 10 shallow cards.

## Bilingual rules

- Translate meaning and professional tone, not word order.
- Keep product names and metrics consistent across languages.
- Avoid unexplained local platform jargon in English; add a short functional description.
- Check that neither language contains information omitted from the other for privacy reasons.

