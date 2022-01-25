module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    maxWidth: {
      'content': '1240px'
    },
    fontSize: {
      'base': ['14px', '24px'],
      '18t': '18px',
      '12t': '12px',
      'mid': '16px',
      'title': '22px',
      'big': '28px',
    },
    fontFamily: {
      'poppins': 'Poppins',
    },
    colors: {
      white: '#fff',
      black: '#000000',
      black: '#181624',
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
      gradient1: "#6E41E2",
      gradient2: "#9B41E2",
      header: "#E5E5E5",
    },
    extend: {
      spacing: {
        '8t': '8px',
        '16t': '16px',
        '10t': '10px',
        '12t': '12px',
        '20t': '20px',
        '24t': '24px',
        '28t': '28px',
        '32t': '32px',
      },
      margin: {
        '4t': '4px',
        '8t': '8px',
        '16t': '16px',
        '12t': '12px',
        '24t': '24px',
        '32t': '32px',
        '36t': '36px',
        '48t': '48px',
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
