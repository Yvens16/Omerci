module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'base': ['14px', '24px'],
      '12t': '12px',
      'mid': '16px',
    },
    fontFamily: {
      'poppins': 'Poppins',
    },
    colors: {
      white: '#fff',
      primary: "#6E41E2",
      primary_hover: "#421BA7",
      secondary_fill: '#EFEDFA',
      third: '#6A6774',
      third_hover: '#F7F7F8',
      danger: '#DB524E',
      input_default: '#DFDDEA',
      input_placeholder: '#A2A5A9',
    },
    extend: {
      spacing: {
        '8t': '8px',
        '16t': '16px',
        '10t': '10px',
        '12t': '12px',
        '20t': '20px',
      },
      margin: {
        '4t': '4px',
        '12t': '12px',
        '24t': '24px',
        '36t': '36px',
      },
      borderRadius: {
        '8t': '8px',
      },
    },
  },
  plugins: [],
}
