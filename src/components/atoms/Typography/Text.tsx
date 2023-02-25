import { TypographyProps, TypographyStyle } from '@mui/material';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';
import { FC } from 'react';
import { ExtractType } from 'types/general';

type TextProps = {
  variant?: ExtractType<Variant, 'body1' | 'caption' | 'h6'>; //body1 is meta p
  children?: string | number | ReactNode;
  styles?: TypographyStyle;
  textProps?: TypographyProps;
};

export const Text: FC<TextProps & TypographyProps> = (props) => {
  const { variant, children, styles, textProps } = props;
  return (
    <Typography variant={variant ?? 'caption'} sx={styles} {...textProps}>
      {children}
    </Typography>
  );
};
