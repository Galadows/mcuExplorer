module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        'tall': { 'raw': '(min-height: 800px)' },
        'medium': { 'raw': '(min-height: 450px)' }
      },
      width: {
        'screen/2': 'calc(100vw / 2)',
      },
      animation: {
        'infinite-scroll': 'infiniteScroll 150s linear infinite',
        'infinite-scroll-inverted':
          'infiniteScrollInverted 150s linear infinite',
        blur: 'blurred linear 0.2s 1 normal forwards',
        unblur: 'unblurred 0.2s forwards',
        'fade-in': 'fadeIn 2s ease-in-out',
        'fade-in-fast': 'fadeIn 0.2s ease-in-out',
        'hover-right': 'hoverRight 2s ease-in-out infinite',
      },
      keyframes: {
        infiniteScroll: {
          '0%': { transform: 'translateX(25%)' },
          '100%': { transform: 'translateX(-25%)' },
        },
        infiniteScrollInverted: {
          '0%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(25)' },
        },
        blurred: {
          '0%': { filter: 'blur(0) brightness(100%)' },
          '100%': { filter: 'blur(2px) brightness(50%)' },
        },
        unblurred: {
          '0%': { filter: 'blur(2px) brightness(50%)' },
          '100%': { filter: 'blur(0px) brightness(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        hoverRight: {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(15px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      },
      colors: {
        'marvel-red': '#ED1D24',
      },
    },
  },
  plugins: [],
}
