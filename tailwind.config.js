module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary: "#ff6363"
      },
      fonts : {
        body : ['Roboto']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
