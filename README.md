# EstateFlow AI

A Next.js, TypeScript and Tailwind CSS presentation prototype for developer-focused WhatsApp workflows in Dubai and the UAE. All data and integrations are simulated.

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. Use `localhost` consistently: Next.js development resources may reject an alternate origin such as `127.0.0.1`.

```sh
npm run build
npm run typecheck
npm test
```

The project statically exports to `out/`. Browser tests require a running dev server at `http://localhost:3000` and Microsoft Edge installed. The Playwright config can be changed to a locally installed Chromium channel if needed. Tests cover scenario completion, timer cancellation, takeover/return, exceptions, dashboard tabs, keyboard navigation, dialog focus and layouts at 1440, 768, 390 and 320 pixels.

Brand and sample content are centralised in `src/data/presentation.ts`. Fonts are loaded from Google Fonts with local system fallbacks. Original legacy components remain in source for reference and are not imported by the new page; Vite entry files are no longer the active application.

See [Figma handoff](docs/FIGMA-HANDOFF.md) for design tokens, component variants, states and responsive references.
