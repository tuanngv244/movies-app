import { Box, BoxProps, SxProps } from '@mui/material';
import React, { forwardRef, ReactNode } from 'react';
import { colors } from 'themes/common/colors';

type CardProps = {
  round?: string;
  hasBoxShadow?: boolean;
  children?: ReactNode | string;
  cardStyles?: SxProps;
  boxProps?: BoxProps;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ round, hasBoxShadow, children, cardStyles, boxProps, ...props }, ref) => {
    return (
      <Box
        sx={{
          borderRadius: round ?? '16px',
          backgroundColor: colors.white,
          border: hasBoxShadow ? `1px solid ${colors.inputGrey}` : 'none',
          boxShadow: hasBoxShadow ? '0px 6px 12px rgba(0, 0, 0, 0.06)' : 'none',
          ...cardStyles,
        }}
        {...boxProps}
      >
        {children}
      </Box>
    );
  },
);

Card.displayName = 'Card';
