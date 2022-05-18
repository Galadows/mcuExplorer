module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infiniteScroll 150s linear infinite',
        'infinite-scroll-inverted':
          'infiniteScrollInverted 150s linear infinite',
          'blur': 'blurred 2s ease-in-out'
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
      },
      colors: {
        'marvel-red': '#ED1D24',
      },
    },
  },
  plugins: [],
}
