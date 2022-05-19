import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    styles: {
      global: {
        body: {
          bg: '#252525',
        },
      },
    },
    colors: {
      primary: {
        50: '#E9FCF6',
        100: '#C1F6E5',
        200: '#98F0D5',
        300: '#70EBC4',
        400: '#48E5B4',
        500: '#20DFA3',
        600: '#1AB282',
        700: '#138662',
        800: '#0D5941',
        900: '#062D21',
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
  })
);

export default theme;
