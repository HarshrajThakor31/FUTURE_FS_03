/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-navy': '#0d1117',
        'polished-metal': '#E6E6E6',
        'kyber-blue': '#00A9E0',
        'tatooine-sand': '#D4A276',
        'holocron-red': '#D83C2B',
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://i.imgur.com/v8tT9oP.jpeg')",
      },
    },
  },
  plugins: [],
};