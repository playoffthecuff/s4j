/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      greet: "var(--greet-font)",
    },
    extend: {
      boxShadow: {
        DEFAULT: "0 6px 10px 0 var(--shadow-color)",
        up: "0 -6px 10px 0 var(--shadow-color)",
        "night-up": "0 -2px 14px 0 var(--shadow-color)",
        "night-down": "0 2px 14px 0 var(--shadow-color)",
        small: "0 1px 8px 0 var(--shadow-color)",
        menu: "-1px 4px 4px 0 var(--shadow-color)",
        "view-top": "0px 32px 48px -20px rgba(0, 0, 0, 1) inset",
        "view-bottom": "0px -32px 48px -20px rgba(0, 0, 0, 1) inset"
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
        600: "600ms",
      },
      transitionDelay: {
        10: "10ms",
        15: "15ms",
        25: "25ms",
        40: "40ms",
        250: "250ms",
        400: "400ms",
      },
      transitionProperty: {
        width: "width",
        padding: "padding",
      },
      screens: {
        min720: "720px",
        min760: "760px",
      },
      minHeight: {
        "over-scroll": "calc(100% + 24px)",
      },
      gridRow: {
        "span-15": "span 15 / span 15",
        "span-17": "span 17 / span 17",
        "span-18": "span 18 / span 18",
        "span-20": "span 20 / span 20",
        "span-25": "span 25 / span 25",
        "span-30": "span 30 / span 30",
        "span-40": "span 40 / span 40",
      },
      filter: {
        "night-filter":
          "grayscale(30%) invert(92%) contrast(83%) hue-rotate(180deg)",
      },
      gridColumn: {
        "span-20": "span 20 / span 20",
        "span-30": "span 30 / span 30",
        "span-40": "span 40 / span 40",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: "hsl(var(--tertiary-foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-out": {
          '0%': {
            opacity: "0",
          },
          '10%': {
            opacity: "0",
          },
          '100%': {
            opacity: "1",
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-out": "fade-out 500ms ease-out",
      },
      cursor: {
        "chevron-right": `url("data:image/svg+xml,%3Csvg width='20' height='32' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'%0Astyle='filter:url(%23shadow);'%3E%3Cdefs%3E%3Cfilter id='shadow'%3E%3CfeDropShadow dx='0.4' dy='0.4' stdDeviation='0.8' /%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M2 14L8 8L2 2' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E "), auto`,
        "chevron-left": `url("data:image/svg+xml,%3Csvg width='20' height='32' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'%0Astyle='filter:url(%23shadow);'%3E%3Cdefs%3E%3Cfilter id='shadow'%3E%3CfeDropShadow dx='0.4' dy='0.4' stdDeviation='0.8' /%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M8 14L2 8L8 2' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E "), auto`,
        "custom-zoom-in": `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%0Astyle='filter:url(%23shadow);'%3E%3Cdefs%3E%3Cfilter id='shadow'%3E%3CfeDropShadow dx='0.4' dy='0.4' stdDeviation='0.8' /%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18 18L14 14' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9 6V12' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6 9L12 9' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E "), auto`,
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
export default config;
