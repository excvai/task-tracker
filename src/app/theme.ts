import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'img, svg, video, canvas, audio, iframe, embed, object': {
          display: 'block',
          verticalAlign: 'middle',
        },
        'a': {
          all: 'unset'
        }
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
});
