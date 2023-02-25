import { InputAdornment, SxProps } from '@mui/material';
import { SearchIcon } from 'assets';
import { FC } from 'react';
import Input from './Input';
import { Typography } from './Typography';
import noop from 'lodash/noop';
import { VoidFunc } from 'types/general';
type SearchBoxProps = {
  label?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>) => void;
  onFocus?: VoidFunc;
  inputStyles?: SxProps;
  value?: string;
  autoFocus?: boolean;
};

export const SearchBox: FC<SearchBoxProps> = ({
  label,
  value,
  placeholder,
  onChange = noop,
  onFocus = noop,
  inputStyles,
  autoFocus,
}) => {
  return (
    <>
      {label && (
        <Typography.Text
          styles={{ fontFamily: 'SFP-M', fontWeight: 500, mb: '10px' }}
          variant="body1"
        >
          {label}
        </Typography.Text>
      )}
      <Input
        fullWidth
        value={value}
        placeholder={placeholder}
        inputProps={{
          onChange: (e) => onChange(e),
          onFocus: () => onFocus(),
          autoFocus: autoFocus,
          startAdornment: (
            <InputAdornment sx={{ mr: 0 }} position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        inputStyles={{ ...inputStyles }}
      />
    </>
  );
};
