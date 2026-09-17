# Privacy and publishing checklist

Run this checklist before any public deployment.

## Identity

- Remove personal phone numbers by default.
- Use a dedicated public email address or contact form.
- Remove home address, ID numbers, birthday and private social handles.
- Confirm the portrait is owned, licensed or AI-generated.

## Work and case studies

- Remove client names unless permission is explicit.
- Remove internal dashboards, account IDs, budgets, raw user data and unreleased plans.
- Replace sensitive screenshots with recreated or blurred visuals.
- Label ranges, estimates, anonymized results and fictional data clearly.
- Confirm former-employer confidentiality obligations.

## Repository hygiene

- Do not commit `.env`, tokens, cookies, local absolute paths or deployment query tokens.
- Scan for email addresses, phone numbers, names and credentials before pushing.
- Keep only assets with clear usage rights.
- Use relative asset URLs so the site works on a GitHub Pages project path.

## Visitor experience

- Do not include a ChatGPT login or any login requirement for a public portfolio.
- Make external links explicit and safe.
- Provide a visible fictional-demo disclosure when content is synthetic.
- Test desktop and mobile layouts, both languages, keyboard navigation and reduced motion.

## Publish only after

- The user has approved the final public content.
- The privacy scan passes.
- The site works locally from a static server.
- The deployed URL is tested in a signed-out browser session.

