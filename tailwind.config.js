/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '100': '100px',
      },
      colors: {
        "dark-orange": 'rgb(223, 156, 100)',
        "lorange": "rgb(236, 173, 122)",
        "light-grey": "rgb(227, 227, 227)",
        "light-orange": "rgb(247, 192, 146)",
        "orangee": 'rgb(223, 156, 100)'
        // "primary-blue": "#1480B7",
        // "dark-grey": "#484848",
        // "green-bright": "#50BB11",
        // "title-black": "#384057",
      },
      flex: {
        '7h': '7 0 70%',
        '3h': '3 0 30%',
      },
    },
  },
  plugins: [],
}
