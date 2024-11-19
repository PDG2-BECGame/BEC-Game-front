/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Archivo HTML principal
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        primaryPurple: {
          DEFAULT: '#592BBC', 
          dark: '#360B9E' ,
        },
        customBlue: '#041D31',
        customPurple: '#592BBC',
      },
      fontFamily: {
        archivo: ['"Archivo Black"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        schibsted: ['"Schibsted Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};