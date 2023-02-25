import { TypographyProps, TypographyStyle } from '@mui/material';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';
import { FC } from 'react';
import { ExtractType } from 'types/general';

type TitleProps = {
  children: string | number | ReactNode;
  variant?: ExtractType<Variant, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>;
  styles?: TypographyStyle;
  titleProps?: TypographyProps;
};

export const Title: FC<TitleProps> = (props) => {
  const { variant, children, styles, titleProps } = props;
  return (
    <Typography variant={variant ?? 'h2'} sx={styles} {...titleProps}>
      {children}
    </Typography>
  );
};
