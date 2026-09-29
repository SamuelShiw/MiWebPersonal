# J. Samuel — Personal Portfolio

Portfolio V2 for **J. Samuel**, focused on Software Engineering & Product Development.

## Stack

- React
- TypeScript
- Vite
- React Router
- i18next / react-i18next
- CSS design tokens and responsive layout

## Architecture

The project separates page composition, reusable UI/layout components, localized content, and shared visual tokens.

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── project/
│   └── ui/
├── content/
│   ├── en/
│   └── es/
├── i18n/
├── pages/
├── sections/
├── styles/
└── main.tsx
```

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Design direction

Neo Swiss Editorial × Cinematic Product Showcase × Engineering Minimalism.

The implementation follows a tokens-first approach and respects `prefers-reduced-motion`.

## Status

Portfolio V2 foundation is under active development on `feature/portfolio-v2`.
