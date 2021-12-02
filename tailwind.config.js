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
     fontFamily: {
      'sans': ['Roboto','ui-sans-serif', 'system-ui']
     },

     boxShadow:{
       'input-box-shadow':'0px 8px 4px rgba(0, 0, 0, 0.25)',
     },
    extend: {
      width:{
        '12/13': '95%',
        'large':'1030px'
      },
      height:{
        'large':'730px'
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
