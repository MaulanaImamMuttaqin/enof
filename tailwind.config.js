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
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'spin-slower': 'spin 5s linear infinite',
        'spin-very-slow' : 'spin 7s linear infinite'
       },
       width:{

       }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
