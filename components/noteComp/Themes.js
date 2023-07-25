import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee', // dark purple  
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme,
    primary: 'black', //primary is black  
    accent: '#03dac4',//_turquoise
    background: '#f6f6f6',//_kindaWhite
    surface: '#ffffff',//_white
    text: '#fff',//_black
  },
};
