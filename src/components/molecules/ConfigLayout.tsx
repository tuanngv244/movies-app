import { Box, Grid } from '@mui/material';
import { GridIcon, ListIcon } from 'assets';
import React, { FC, ReactNode, useState } from 'react';
import { colors } from 'themes/common/colors';
import noop from 'lodash/noop';

type ConfigLayoutProps = {
  children?: ReactNode;
  id?: string;
  onChangeLayout?: (type: 'list' | 'grid') => void;
};

export const ConfigLayout: FC<ConfigLayoutProps> = ({ children, id, onChangeLayout = noop }) => {
  const [type, setType] = useState<'list' | 'grid'>('grid');
  const configLayout =
    type == 'list' ? '1fr' : { xs: '1fr', sm: 'repeat(3,1fr)', md: 'repeat(4, 1fr)' };

  const buttonStyles = {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: '1px solid white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    svg: {
      stroke: colors.white,
      fill: colors.white,
    },
    path: {
      stroke: colors.white,
      fill: colors.white,
    },
    '&:hover': {
      backgroundColor: colors.white,
      svg: {
        stroke: colors.black,
        fill: colors.white,
      },
      'path, rect, circle': {
        stroke: colors.black,
        fill: colors.white,
      },
    },
    '&.active': {
      backgroundColor: colors.white,
      svg: {
        stroke: colors.black,
        fill: colors.white,
      },
      'path, rect, circle': {
        stroke: colors.black,
        fill: colors.white,
      },
    },
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0 10px',
          marginBottom: '20px',
        }}
      >
        <Box
          className={type == 'list' ? 'active' : ''}
          sx={buttonStyles}
          onClick={() => {
            setType('list');
            onChangeLayout('list');
          }}
        >
          <ListIcon style={{ width: '22px', height: '22px' }} />
        </Box>
        <Box
          className={type == 'grid' ? 'active' : ''}
          sx={buttonStyles}
          onClick={() => {
            setType('grid');
            onChangeLayout('grid');
          }}
        >
          <GridIcon style={{ width: '22px', height: '22px' }} />
        </Box>
      </Box>
      <Grid
        container
        sx={{
          display: 'grid',
          gridTemplateColumns: configLayout,
          gridRowGap: '16px',
          gridColumnGap: '16px',
        }}
        id={id}
      >
        {children}
      </Grid>
    </React.Fragment>
  );
};
