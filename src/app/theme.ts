import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {}

  interface ThemeOptions {}

  interface Palette {
    neutral: Palette['primary'];
    light: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    light: PaletteOptions['primary'];
  }

  interface PaletteColor {}

  interface SimplePaletteColorOptions {}
}

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    light: true;
  }
}

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'img, svg, video, canvas, audio, iframe, embed, object': {
          display: 'block',
          verticalAlign: 'middle',
        },
        a: {
          all: 'unset',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'top',
        enterTouchDelay: 0,
        leaveTouchDelay: 3000,
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: grey[800],
        },
        tooltipPlacementTop: {
          marginBottom: '0 !important',
        },
      },
    },
  },
  palette: {
    neutral: {
      // main: '#64748B',
      // contrastText: '#fff',
      main: '#091E4224',
      contrastText: '#172B4D',
    },
    light: {
      // main: '#fff',
      main: 'hsl(0, 0%, 90%)',
      dark: 'hsl(0, 0%, 80%)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },
});
