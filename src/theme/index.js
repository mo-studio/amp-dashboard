import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: '#495970',
    },
    secondary: {
      main: '#73a8d0',
    },
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[600],
    },
  },

  overrides: {
    MUIDataTableHeadCell: {
      root: {
        marginLeft: '0px',
        marginRight: '0px',
      },
      fixedHeader: {
        marginLeft: '0px',
        marginRight: '0px',
      },
    },
  },

  shadows,
  typography,
});

export default theme;
