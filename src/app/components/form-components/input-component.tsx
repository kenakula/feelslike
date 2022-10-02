import React from 'react';
import TextField from '@mui/material/TextField';
import { SxProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ColorTypes, InputTypes, MuiVariantType } from 'app/types';

interface Props<T extends FieldValues> {
  formControl: Control<T, any>;
  type: InputTypes;
  name: Path<T>;
  label: string;
  fullwidth: boolean;
  error?: boolean;
  errorMessage?: string;
  variant?: MuiVariantType;
  small?: boolean;
  color?: ColorTypes;
  styles?: SxProps;
  multiline?: number;
}

export const InputComponent = <T extends FieldValues>({
  formControl,
  type,
  name,
  label,
  fullwidth,
  variant = 'outlined',
  small,
  color = 'primary',
  error,
  errorMessage,
  styles,
  multiline,
}: Props<T>): JSX.Element => {
  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          sx={styles}
          size={small ? 'small' : undefined}
          label={label}
          fullWidth={fullwidth}
          multiline={!!multiline}
          rows={multiline}
          variant={variant}
          type={type}
          color={color}
          error={error}
          helperText={error && errorMessage}
        />
      )}
    />
  );
};
