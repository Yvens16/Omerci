import '../styles/globals.css';
import _JSXStyle from 'styled-jsx/style';
if (typeof global !== 'undefined') {
  Object.assign(global, { _JSXStyle })
}
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}