// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette 1 (Earthy & Warm)
        p1: {
          rust: '#D36135',      // Utama / Accent Warm
          asparagus: '#7FB069', // Secondary / Nature Accent
          parchment: '#ECE4B7', // Light Background / Subtle Card
          fawn: '#E6AA68',      // Highlight / Warning / Warm Accent
          richblack: '#02020B', // Dark Text / Deep Background
        },
        // Palette 2 (Bold & Elegant Classic)
        p2: {
          richblack: '#001427', // Deep Dark / Navbar / Primary Dark
          cambridge: '#708D81', // Secondary / Muted Accent
          buff: '#F4D58D',      // Warm Light Accent / Soft Card
          engineering: '#BF0603',// Primary Action / CTA / Alert
          rosewood: '#8D0801',  // Hover State / Deep Red
        }
      },
    },
  },
  plugins: [],
}