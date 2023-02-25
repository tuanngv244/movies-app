import { createTheme } from '@mui/material';
import { breakpoints } from './common/breakpoints';
import { colors } from './common/colors';
import cssBaseline from './common/cssBaseline';
import { zIndex } from './common/zIndex';
import { typography } from './components/typography';

const themes = createTheme({
  palette: {
    primary: {
      main: '#2457f0',
      light: '#6585e3',
    },
    success: { main: '#29B46A', light: '#E7FFF2' },
    warning: { main: '#F3CD68', light: '#FFF7E3' },
    error: { main: '#FF3F3C', dark: '#B2120F', light: '#FFF0EF' },
  },
  typography: typography,
  breakpoints: breakpoints,
  components: {
    MuiCssBaseline: cssBaseline,
    MuiButton: {
      defaultProps: {
        // disableElevation: false,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 700,
          fontFamily: 'SFP-R',
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#1045e6',
          },
        },
        contained: {
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 600,
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        },
        text: {
          minWidth: 0,
          lineHeight: '15px',
          padding: 0,
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          fontFeatureSettings: "'ss01' on, 'ss03' on",
          transform: 'scale(1)',
          lineHeight: '17px',
          overflow: 'visible',
          fontSize: '14px',
        },
        asterisk: {},
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: '8px',
          fontFeatureSettings: "'ss01' on, 'ss03' on",
          fontSize: '14px',
          lineHeight: '17px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          height: '40px',
          fontWeight: 400,
          fontSize: '14px',
          padding: '10px 16px',
          lineHeight: '16.7px',
          transition: 'all .2s',
          '& .MuiInputAdornment-root': {
            zIndex: zIndex.lv3,
          },
          '&:hover': {
            '&:not(.Mui-disabled)': {
              '&:before': {
                border: `1px solid ${colors.main}`,
                transition: 'all .2s',
              },
            },
          },
          '&:focus': {
            outline: 'none',
            '&:before': {
              border: `1px solid ${colors.main}`,
              transition: 'all .2s',
            },
          },
          '&:before': {
            top: -0.5,
            height: '100%',
            border: `1px solid ${colors.inputGrey}`,
            borderRadius: '10px',
            transition: 'all .2s',
          },
          '&:after': {
            display: 'none',
          },
          '&.has-uppercase': {
            input: {
              textTransform: 'uppercase',
              '&::placeholder': {
                textTransform: 'none',
              },
            },
          },
          input: {
            padding: '0 16px',
            color: colors.black,
            zIndex: zIndex.lv2,
            transition: 'all .2s',
            '&:-webkit-autofill': {
              '-webkit-box-shadow': '0 0 0 100px #fff inset',
            },
            '&::placeholder': {
              color: colors.mediumGrey,
            },
          },
          '&::before': {
            backgroundColor: colors.white,
          },
          '&:hover:not(.Mui-disabled)::before': {
            borderBottomWidth: '1px',
          },
          '&::after': {
            borderBottomWidth: '1px',
          },
          '&.Mui-error': {
            input: {},
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          defaultProps: {
            disableElevation: false,
            disableRipple: true,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #E6E1E5',
          borderRadius: '16px',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default themes;
