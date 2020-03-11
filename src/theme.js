import { createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'cursive',
      'sans-serif',
      '"Comic Sans MS"',
    ].join(','),
  },
  htmlFontSize: 10,
});
