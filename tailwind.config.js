module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      width: {
        'screen/2': 'calc(100vw / 2)',
      },
      animation: {
        'infinite-scroll': 'infiniteScroll 150s linear infinite',
        'infinite-scroll-inverted':
          'infiniteScrollInverted 150s linear infinite',
        blur: 'blurred 2s ease-in-out',
        'fade-in': 'fadeIn 2s ease-in-out'
      },
      keyframes: {
        infiniteScroll: {
          '0%': { transform: 'translateX(54%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        infiniteScrollInverted: {
          '0%': { transform: 'translateX(-54%)' },
          '100%': { transform: 'translateX(50%)' },
        },
        blurred: {
          '0%': { filter: 'blur(0)' },
          '100%': { filter: 'blur(2px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        'marvel-red': '#ED1D24',
      },
    },
  },
  plugins: [],
}
