# Application Source Rules — Monteerly

## Change discipline
- Prefer the smallest approved change that addresses the task.
- Preserve existing routes, components, locale behavior, role flows, accessibility behavior, and user-facing capabilities.
- Do not delete a component because it appears unused without evidence and explicit approval.
- Do not turn real integrations into mock data or placeholders without approval.

## Next.js and TypeScript
- Follow existing project conventions for the App Router, server/client boundaries, authentication, and localization.
- Never expose server-only values to client-side code.
- Never use Supabase service-role credentials in browser/client components.
- Keep user-facing errors safe; do not log secrets or personal data.

## UI
- Preserve the current design system and accessibility behavior.
- Do not change a feature's structure or user journey outside the approved scope.
- Prefer existing reusable components over new parallel patterns.
