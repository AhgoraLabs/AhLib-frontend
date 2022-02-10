const { colors } = require('tailwindcss/defaultTheme')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#060b26',
      'secondary': '#f5f5f5',
      'blue': '#1a83ff',
      'login':'#557085;',
      'input':'#f5f5f5',
      'input-submit':'#677eff',
      'input-signup':'#e73e49',
      'register':'#ad6232'
    
    }),
      letterSpacing: {
        large: '1px',
      },

    textColor: {
      'roxo': 'rgb(144, 44, 211)',
      'bemvindo': '#374151',
      'rodape': 'rgb(139, 135, 135)',
      'textbook': '#008000',
      'primary': '#f5f5f5',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
      'login':'#555',
      'white':'#fff',
      'link':'#577eff',
      ...colors
    },
    fontFamily: {
      'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
      'poppins': ['Poppins', 'ui-sans-serif', 'system-ui']
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '48': '12rem',
    },
      boxShadow: {
        'input-box-shadow': '0px 8px 4px rgba(0, 0, 0, 0.25)',
        'login':'0 15px 50px rgba(0,0,0,0.1)',
        'lg':'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;'
      },
      extend: {
        width: {
          '12/13': '95%',
          'large': '1030px',
          'bookInfo': '80%',
          'bookTitle':'784px',
          'login':'800px',
          'image-login':'400px'
        },
        height: {
          'large': '730px',
          'bookInfo': '790px',
          'image-login':'500px',
          'card':'250px'
        }
      },
    },
    variants: {
      extend: {
        backgroundColor: ['active'],
        transitionDelay: ['hover', 'focus'],
        spacing:{
          'negative-full': '-100%'
        }
      },
    },
    plugins: [],
  }
