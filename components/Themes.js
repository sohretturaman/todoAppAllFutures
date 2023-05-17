import {DefaultTheme, MD2DarkTheme} from 'react-native-paper';

const themes = {
  light: {
    ...DefaultTheme.colors,
    primary_darkPurple: '#6200ee',
    accent_turquoise: '#03dac4',
    background_kindaWhite: '#f6f6f6',
    surface_white: '#ffffff',
    text_black: '#000000',
  },

  dark: {
    ...MD2DarkTheme.colors,
    primary_purple: '#bb86fc',
    accent_turquoise: '#03dac4',
    background_kindaBlack: '#121212',
    surface_darkGray: '#212121',
    text_white: '#ffffff',
  },
};

export default themes;
