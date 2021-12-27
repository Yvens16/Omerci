module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'base': ['14px', '24px'],
      '18t': '18px',
      '12t': '12px',
      'mid': '16px',
      'title': '22px'
    },
    fontFamily: {
      'poppins': 'Poppins',
    },
    colors: {
      white: '#fff',
      black: '#000000',
      black_login: '#181624',
      primary: "#6E41E2",
      primary_hover: "#421BA7",
      secondary_fill: '#EFEDFA',
      third: '#6A6774',
      third_hover: '#F7F7F8',
      danger: '#DB524E',
      input_default: '#DFDDEA',
      input_placeholder: '#A2A5A9',
      default_bg:'#F9F9FB',
      modal: 'rgba(24, 22, 36, 0.47)',
    },
    extend: {
      spacing: {
        '8t': '8px',
        '16t': '16px',
        '10t': '10px',
        '12t': '12px',
        '20t': '20px',
        '24t': '24px'
      },
      margin: {
        '4t': '4px',
        '8t': '8px',
        '16t': '16px',
        '12t': '12px',
        '24t': '24px',
        '32t': '32px',
        '36t': '36px',
      },
      borderRadius: {
        '4t': '4px',
        '8t': '8px',
        '12t': '12px',
      },
    },
  },
  plugins: [],
}
