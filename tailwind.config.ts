import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'du-gray': '#cccccc', // Your custom color name
        'du-blue': '#00a9ce',
        'du-pink': '#c700b1',
        'du-gray-light': '#dededd',
        'du-gray-lighter': '#dddddd',
        'du-purple': '#753bbd',
        'du-gray-dark': '#787778',
      },
    },
  },
  plugins: [],
} satisfies Config;
