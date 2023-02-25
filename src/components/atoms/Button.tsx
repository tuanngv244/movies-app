import { FC, ReactNode } from 'react';
import { Button as ButtonComp, ButtonProps, SxProps } from '@mui/material';
import { colors } from 'themes/common/colors';
type CustomButtonProps = {
  round?: string;
  disable?: boolean;
  fullWidth?: boolean;
  typeDisplay?: 'cancel' | 'error' | 'main' | 'outline-main' | 'warning';
  children?: ReactNode | string;
  buttonStyles?: SxProps;
  buttonProps?: ButtonProps;
};

export const Button: FC<CustomButtonProps & ButtonProps> = ({
  round,
  disable,
  typeDisplay = 'main',
  children,
  fullWidth,
  buttonStyles,
  buttonProps,
}) => {
  const actionStyles = () => {
    let defaultStyles: SxProps = {
      background: colors.main,
      transition: 'all .2s',
    };
    if (typeDisplay === 'warning') {
      defaultStyles = {
        width: { xs: '80px', md: '100px' },
        height: '40px',
        background: colors.error,
        color: colors.white,
        border: `1px solid ${colors.error}`,
        '&:hover': {
          background: colors.white,
          color: colors.error,
          border: `1px solid ${colors.error}`,
        },
      };
    }
    if (typeDisplay === 'cancel') {
      defaultStyles = {
        width: { xs: '80px', md: '100px' },
        height: '40px',
        background: colors.white,
        color: colors.darkGrey,
        border: `1px solid ${colors.darkGrey}`,
        '&:hover': {
          background: colors.darkGrey,
          color: colors.white,
        },
      };
    }
    if (typeDisplay === 'error')
      defaultStyles = {
        width: { xs: '80px', md: '100px' },
        height: '40px',
        background: colors.white,
        color: colors.error,
        border: `1px solid ${colors.error}`,
        opacity: 1,
        svg: {
          path: {
            transition: 'all .2s',
          },
        },
        '&:hover': {
          background: colors.error,
          color: colors.white,
          svg: {
            path: {
              fill: colors.white,
              transition: 'all .2s',
            },
          },
        },
      };
    if (typeDisplay === 'outline-main') {
      defaultStyles = {
        width: { xs: '80px', md: '100px' },
        height: '40px',
        background: colors.white,
        color: colors.main,
        border: `1px solid ${colors.main}`,
        opacity: 1,
        svg: {
          path: {
            transition: 'all .2s',
          },
        },
        '&:hover': {
          background: colors.main,
          color: colors.white,
          svg: {
            path: {
              fill: colors.white,
              transition: 'all .2s',
            },
          },
        },
      };
    }

    return defaultStyles;
  };

  return (
    <ButtonComp
      disabled={disable}
      variant="contained"
      fullWidth={fullWidth}
      sx={{
        borderRadius: round ?? '4px',
        height: '40px',
        textTransform: 'initial',
        ...actionStyles(),
        ...buttonStyles,
      }}
      {...buttonProps}
    >
      {children}
    </ButtonComp>
  );
};
