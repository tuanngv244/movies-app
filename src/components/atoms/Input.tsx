import {
  Box,
  FormHelperText,
  Input as InputComp,
  InputBaseProps,
  SxProps,
  TextFieldProps,
} from '@mui/material';
import { FC } from 'react';
import { colors } from 'themes/common/colors';
import { Typography } from './Typography';

export type InputProps = {
  id?: string;
  name?: string;
  value?: string | number;
  fullWidth?: boolean;
  placeholder?: string;
  pattern?: string;
  disable?: boolean;
  type?: string;
  readOnly?: boolean;
  inputStyles?: SxProps;
  inputProps?: InputBaseProps;
  wrapInputStyles?: SxProps;
  labelStyles?: SxProps;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  notBeforeIcon?: boolean;
  notValid255?: boolean;
};

const Input: FC<InputProps & TextFieldProps> = ({
  label,
  id,
  name,
  value,
  fullWidth,
  placeholder,
  pattern,
  disable,
  type,
  readOnly = false,
  error,
  errorMessage,
  inputStyles,
  inputProps,
  wrapInputStyles,
  notBeforeIcon,
  notValid255 = false,
}) => {
  return (
    <Box sx={wrapInputStyles}>
      {label && (
        <Typography.Text
          variant="body1"
          styles={{
            marginBottom: '8px',
            fontFamily: 'SFP-M',
            fontWeight: 500,
            color: colors.black,
          }}
        >
          {label}
        </Typography.Text>
      )}
      <InputComp
        id={id}
        name={name}
        fullWidth={fullWidth}
        value={value}
        placeholder={placeholder}
        disabled={disable}
        type={type}
        inputProps={{ pattern: pattern, readOnly: readOnly, maxLength: notValid255 ? 255 : null }}
        sx={{
          '&:hover': {
            '&:not(.Mui-disabled)': {
              '&:before': {
                border: `1px solid ${readOnly ? colors.inputGrey : colors.main}`,
                transition: 'all .2s',
              },
            },
          },
          padding: notBeforeIcon ? '0' : '0 16px',
          ...inputStyles,
        }}
        {...inputProps}
      />
      {error && errorMessage && (
        <FormHelperText sx={{ mt: '5px' }} error>
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export default Input;
