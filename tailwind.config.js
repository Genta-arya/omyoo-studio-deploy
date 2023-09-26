/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      animation: ['motion-safe', 'motion-reduce', 'hover', 'focus', 'group-hover', 'animate-once'],
    },
  },
}


