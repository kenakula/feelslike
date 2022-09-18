import TextField from '@mui/material/TextField';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ColorTypes, InputTypes, VariantType } from 'app/types';
import { SxProps } from '@mui/material';

interface Props<T extends FieldValues> {
  formControl: Control<T, any>;
  type: InputTypes;
  name: Path<T>;
  label: string;
  fullwidth: boolean;
  error?: boolean;
  errorMessage?: string;
  variant?: VariantType;
  small?: boolean;
  color?: ColorTypes;
  styles?: SxProps;
  multiline?: boolean;
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
          multiline={multiline}
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
