// \`\`\`typescript
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(280, 10%, 10%)",
        primary: {
          DEFAULT: "hsl(280, 80%, 50%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(280, 20%, 95%)",
          foreground: "hsl(280, 10%, 20%)",
        },
        muted: {
          DEFAULT: "hsl(280, 15%, 96%)",
          foreground: "hsl(280, 10%, 40%)",
        },
        accent: {
          DEFAULT: "hsl(280, 30%, 95%)",
          foreground: "hsl(280, 10%, 20%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(280, 10%, 10%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(280, 10%, 10%)",
        },
        sidebar: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(280, 10%, 20%)",
          "accent": "hsl(280, 30%, 95%)",
          "accent-foreground": "hsl(280, 80%, 50%)",
          border: "hsl(280, 20%, 90%)",
          ring: "hsl(280, 80%, 50%)",
        },
        border: "hsl(280, 20%, 85%)",
        input: "hsl(280, 20%, 85%)",
        ring: "hsl(280, 80%, 50%)",
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
      },

      boxShadow: {
        'custom': '4px 4px 10px #060e1b, -4px -4px 10px #040000',
      },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
    },
  },
  plugins: [],
} satisfies Config;
// \`\`\`

