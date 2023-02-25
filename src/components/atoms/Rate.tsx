import { Box } from '@mui/system';
import { StarIcon } from 'assets';
import { FC } from 'react';
import { colors } from 'themes/common/colors';

type RateProps = {
  value: number;
};

export const Rate: FC<RateProps> = ({ value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0 5px',
      }}
    >
      {Array.from({ length: 10 }).map((star, idx) => {
        return (
          <Box
            key={idx}
            sx={{
              width: '20px',
              height: '20px',
              'svg, path': {
                fill: Math.floor(value) > idx ? colors.yellow : colors.white,
              },
            }}
          >
            <StarIcon />
          </Box>
        );
      })}
    </Box>
  );
};
