import { Box, BoxProps, SxProps } from '@mui/material';
import React, { FC, ReactNode } from 'react';

const Layout: FC<{ children?: ReactNode; boxProps?: BoxProps; wrapStyles?: SxProps }> = ({
  children,
  boxProps,
  wrapStyles,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '95%',
        padding: '14px 0',
        // maxWidth: { sm: '500px', md: '750px', lg: '1170px', xl: '1370px' },
        margin: 'auto',
        ...wrapStyles,
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default Layout;
