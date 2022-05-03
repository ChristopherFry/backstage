import { SelectItem } from '@backstage/core-components';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MaterialSelect,
} from '@material-ui/core';
import React, { ChangeEvent } from 'react';

type SelectProps = {
  label: string;
  selected: string;
  items: SelectItem[];
  onChange: (value: string) => void;
  className?: string;
  helperText?: string;
};

export const Select = ({
  label,
  selected,
  items,
  onChange,
  className,
  helperText,
}: SelectProps) => {
  const handleChange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ): void => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth variant="outlined" className={className}>
      <InputLabel id="select-label">{label}</InputLabel>
      <MaterialSelect
        labelId="select-label"
        value={selected}
        label={label}
        onChange={handleChange}
      >
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MaterialSelect>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
