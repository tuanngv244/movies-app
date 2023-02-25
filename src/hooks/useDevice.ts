import { useMediaQuery, useTheme } from '@mui/material';

export const useDevice = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const tablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const laptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const desktop = useMediaQuery(theme.breakpoints.between('lg', 'xl'));

  return {
    mobile,
    tablet,
    laptop,
    desktop,
  };
};
