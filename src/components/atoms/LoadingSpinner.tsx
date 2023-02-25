import { Box, SxProps } from '@mui/material';
import { FC } from 'react';

type LoadingSpinnerProps = {
  isLoading: boolean;
  wrapperStyles?: SxProps;
  spinnerStyles?: SxProps;
};

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  isLoading,
  wrapperStyles,
  spinnerStyles,
}) => {
  return (
    <Box sx={wrapperStyles}>
      {isLoading && (
        <Box
          sx={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '4px dotted white',
            animation: 'rotation 2s linear infinite',
            '@keyframes rotation': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
            ...spinnerStyles,
          }}
        ></Box>
      )}
    </Box>
  );
};
