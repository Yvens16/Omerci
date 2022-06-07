module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    maxWidth: {
      content: '1240px',
      laptopContent: "687px",
    },
    fontSize: {
      base: ['14px', '24px'],
      '18t': '18px',
      '12t': '12px',
      '14t': '14px',
      mid: '16px',
      title: '22px',
      big: '28px'
    },
    fontFamily: {
      poppins: 'Poppins'
    },
    colors: {
      white: '#fff',
      black: '#181624',
      primary: '#6E41E2',
      primary_hover: '#421BA7',
      secondary_fill: '#EFEDFA',
      third: '#6A6774',
      third_hover: '#F7F7F8',
      danger: '#DB524E',
      input_default: '#DFDDEA',
      input_placeholder: '#A2A5A9',
      default_bg: '#F9F9FB',
      modal: 'rgba(24, 22, 36, 0.47)',
      gradient1: '#6E41E2',
      gradient2: '#9B41E2',
      header: '#E5E5E5',
      iconsParams: "rgba(249, 249, 251, 0.34)",
      msgHug:"rgba(255, 255, 255, 0.2)",
      shape_bg: "rgba(119, 13, 255, 0.07)",
      dashed_third: "rgba(106, 103, 116, 0.33)",
      profile_card_gradient: "linear-gradient(153deg, #E2415E 16.87%, #E241DC 78.3%)",
    },
    extend: {
      width: {
        inherit: "inherit"
      },
      backgroundImage: {
        // 'params': "url('/public/images/card_params_bg.jpg')"
      },
      boxShadow: {
        option_box_shadow: '0 7px 8px rgba(123, 97, 255, 0.05)',
        card_box_shadow: '0px 5px 12px rgba(0, 0, 0, 0.05)',
        shape_shadow: 'inset 0px 0px 45px rgba(24, 133, 242, 0.1)',
        gif_header_shadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        '4t': '4px',
        '8t': '8px',
        '16t': '16px',
        '10t': '10px',
        '12t': '12px',
        '20t': '20px',
        '24t': '24px',
        '28t': '28px',
        '32t': '32px',
        '40t': '40px',
        '48t': '48px'
      },
      margin: {
        '4t': '4px',
        '6t': '6px',
        '8t': '8px',
        '12t': '12px',
        '14t': '14px',
        '16t': '16px',
        '24t': '24px',
        '32t': '32px',
        '36t': '36px',
        '40t': '40px',
        '48t': '48px',
        '56t': '56px'
      },
      borderRadius: {
        '4t': '4px',
        '8t': '8px',
        '12t': '12px',
        '16t': '16px'
      }
    }
  },
}
