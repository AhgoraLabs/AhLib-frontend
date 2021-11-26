module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#060b26',
      'secondary': '#f5f5f5',
      'blue': '#1a83ff',
     }),
     textColor: {
       'primary': '#f5f5f5',
       'secondary': '#ffed4a',
       'danger': '#e3342f',
     },

    extend: {
      width:{
        '12/13': '95%'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      transitionDelay: ['hover', 'focus'],
    },
  },
  plugins: [],
}
