import { Box, BoxProps, SxProps } from '@mui/material';
import BackgroundAuth from 'assets/images/bg-login.jpg';
import { FC, ReactNode } from 'react';

const WrapAuth: FC<{ children: ReactNode | string; wrapStyles?: SxProps; boxProps?: BoxProps }> = ({
  children,
  wrapStyles,
  boxProps,
}) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundImage: `url(${BackgroundAuth})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        ...wrapStyles,
      }}
      {...boxProps}
    >
      <Box
        sx={{
          padding: '0 150px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default WrapAuth;
