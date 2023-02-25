import { Box } from '@mui/system';
import { FC, ReactNode } from 'react';
import { colors } from 'themes/common/colors';
import { SxProps } from '@mui/material';

type LoadingProps = {
  isLoading: boolean;
  children?: (() => ReactNode) | ReactNode;
  loadingWrapStyles?: SxProps;
};

const Loading: FC<LoadingProps> = ({ isLoading, children, loadingWrapStyles }) => {
  return (
    <Box sx={{ ...loadingWrapStyles }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.white,
            zIndex: 2000,
            '> div': {
              width: '10px',
              height: '30px',
              backgroundColor: colors.main,
              borderRadius: '2px',
              margin: '0 3px',
              '&:nth-of-type(1)': {
                animation: 'scaleHeight 1s -0.45s ease-in-out infinite',
              },
              '&:nth-of-type(2)': {
                animation: 'scaleHeight 1s -0.30s ease-in-out infinite',
              },
              '&:nth-of-type(3)': {
                animation: 'scaleHeight 1s -0.15s ease-in-out infinite',
              },
              '&:nth-of-type(4)': {
                animation: 'scaleHeight 1s ease-in-out infinite',
              },
            },
            '@keyframes scaleHeight': {
              '0%': {
                transform: 'scaleY(0.5)',
              },
              '50%': {
                transform: 'scaleY(1.4)',
              },
              '100%': {
                transform: 'scaleY(0.5)',
              },
            },
          }}
        >
          <Box component="div"></Box>
          <Box component="div"></Box>
          <Box component="div"></Box>
          <Box component="div"></Box>
        </Box>
      )}
      {children && typeof children === 'function' ? children() : children}
    </Box>
  );
};

export default Loading;
