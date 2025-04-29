# FIReUX Copilot, Style & Workspace Conventions

This single reference unites GPT instructions with Copilot workspace guidance—ensuring every AI suggestion and code completion aligns with our Nuxt 3 + Tailwind + Shadcn/ui + Firebase + Stripe stack and FIReUX priorities.

## 1. General Response & Code Style

- Structured & Actionable: Use headings and bullet points; avoid fluff. Provide a summary for deep context, expand on demand.
- Focused & FIReUX‑Driven: Tie suggestions back to MVP simplicity, scalability, and design‑system consistency.
- Chat Behavior:
  - **FIReUX‑Code:** Concise technical advice for Nuxt 3, Firebase, UI; step‑by‑step debugging when needed.
  - **FIReUX‑MVP:** MVP‑first mindset—fast value, simple UI, growth‑focused features.
  - **FIReUX‑Marketing:** Tie in SEO, pricing, subscription strategies only when relevant.
- Formatting:
  - Use bullet points & headings.
  - Summarize long responses before details.
  - Code snippets: clean, minimal, follow Nuxt 3 & Firebase best practices with brief explanations.

## 2. UI Layer & Styling

1. **Design System First:** Always prefer Shadcn/ui components (`<Button>`, `<Card>`) before primitives.
2. **NuxtUI Primitives:** Compose missing pieces using `<Box>`, `<Flex>`, `<Text>`.
3. **Tailwind Utilities Sparingly:** Only for minor layout/spacing; use design tokens from `tailwind.config.ts` (e.g., `p-4`, `text-lg`).
4. **No New CSS:** Extend via design tokens only; no ad hoc `<style>` blocks.

## 3. Folder Structure & Naming

```
src/
├── components/        # UI: atoms/, molecules/, organisms/
├── composables/       # Auto-imports: useAuth, useFireUXUser, useRouter
├── layouts/           # Layouts (Default, Auth)
├── pages/             # Route views
└── styles/            # tailwind.config.ts, globals.css
```

- Atomic suffixes: `Button.atom.vue`, `Form.molecule.vue`.
- Barrel exports: `components/atoms/index.ts` for clean imports.

## 4. Auto‑Imports & Aliases

- **Nuxt Auto‑import:** `useRouter()`, `useFetch()`, plus:
  ```js
  import { useFireUXUser } from '@/composables/entities/useFireUXUser'
  import { useAuth } from '@/composables/firebase/useAuth'
  ```
- **Firebase:** In composables, import only:
  ```js
  import { doc, collection } from 'firebase/firestore'
  ```
- **Path Aliases:** Always use `@/components/...` or `@/composables/...`, never deep relative paths.

## 5. Vue & Script Conventions

- Use `<script setup>` exclusively; no Options API.
- `defineProps`/`defineEmits` with TypeScript interfaces and JSDoc.
- Composition API only; no `this` references.

## 6. VS Code & Copilot Settings

Add to `.vscode/settings.json`:

```json
{
  "github.copilot.inlineSuggest.enable": true,
  "github.copilot.suggestionDelay": 25,
  "github.copilot.maxVisibleSuggestions": 5,
  "editor.tabCompletion": "on",
  "editor.suggestSelection": "first"
}
```

**Example Prompt:**

```js
// Copilot: Create an AuthLayout.vue using <Card> and <Form> from Shadcn/ui
```

Use these guidelines to keep every AI‑generated snippet consistent, maintainable, and FIReUX‑focused.

## 7. Icons Management

- Use the `UIcon` component from Nuxt UI (auto‑imported).
- Rely on the Lucide icon set via UIcon naming conventions: e.g. `i-lucide-camera`, `i-lucide-trash-2`, `i-lucide-upload-cloud`.
- For custom brand or logo icons, add SVG components under `app/components/logo/` and import via alias or auto‑import (e.g. `<Flame />`, `<Type />`).
- Always use absolute aliases (`@/components/logo/...`) or Nuxt auto‑import for icon components—no deep relative paths.
- Apply consistent sizing via design tokens or UIcon `size` prop (e.g. `size="6"`) or utility classes (`w-6 h-6`).
- Centralize icon lists in a composable (`composables/icons/useSkillsIcons.ts` or similar) for reuse in components like `SkillsIcons.vue`.
- Update this section and related docs whenever adding new Lucide icons or custom SVG logos.
