import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { ColorTypes, MuiVariantType, SelectOption } from 'app/shared/types';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  formControl: Control<T, any>;
  name: Path<T>;
  label: string;
  id: string;
  options: SelectOption<string>[];
  error?: boolean;
  errorMessage?: string;
  variant?: MuiVariantType;
  small?: boolean;
  color?: ColorTypes;
  styles?: SxProps;
  disabled?: boolean;
  multiple?: boolean;
}

export const SelectComponent = <T extends FieldValues>({
  formControl,
  name,
  label,
  error,
  errorMessage,
  variant,
  small,
  color,
  styles,
  id,
  disabled,
  options,
  multiple,
}: Props<T>): JSX.Element => {
  return (
    <FormControl fullWidth size={small ? 'small' : undefined}>
      <InputLabel color={color} id={`${id}-label`} htmlFor={id}>
        {label}
      </InputLabel>
      <Controller
        control={formControl}
        name={name}
        render={({ field }) => (
          <Select
            id={id}
            sx={styles}
            {...field}
            disabled={disabled}
            labelId={`${id}-label`}
            label={label}
            variant={variant ?? 'outlined'}
            error={error}
            color={color}
            multiple={multiple}
            renderValue={
              multiple
                ? selected => {
                    const array = selected as string[];
                    return array.join(', ');
                  }
                : undefined
            }
            MenuProps={{
              sx: { maxHeight: '250px' },
            }}
          >
            {options.map((option: SelectOption<string>) => (
              <MenuItem key={option.label} value={option.value}>
                {multiple ? (
                  <Checkbox checked={field.value.indexOf(option.value) > -1} />
                ) : null}
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};
