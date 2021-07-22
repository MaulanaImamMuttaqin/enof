module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
       '2000': '2000ms',
      },
      colors:{
        primary: "#ff6363"
      },
      fonts : {
        body : ['Roboto']
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'spin-slower': 'spin 8s linear infinite',
        'spin-very-slow' : 'spin 11s linear infinite'
       },
       width:{

       }, 
       transitionProperty: {
        'top': 'top',
       },
       inset:{
         '100px' : "100px",
         '200px' : "200px",
         '300px' : "300px",
         '400px' : "400px",
         '500px' : "500px"
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
