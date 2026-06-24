import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        "deck-bg-light": "#FAFAF8",
        "deck-bg-dark": "#0D0D0D",
        "deck-primary": "#111111",
        "deck-muted": "#999999",
        "deck-border": "#E8E0D0",
        "deck-cream": "#F0EDE8",
        "deck-text-on-dark": "#FAFAF8",
        "deck-muted-on-dark": "#555555",
        "deck-body": "#444444",
        "deck-card-metric": "#BBBBBB",
        "deck-hint": "#BBBBBB",
        "deck-pill-border": "#CCCCCC",
        "deck-footer": "#333333",
        "deck-deco-dark": "#161616",
        "deck-divider-dark": "#222222",
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        body: [
          "Instrument Sans",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
} satisfies Config;
