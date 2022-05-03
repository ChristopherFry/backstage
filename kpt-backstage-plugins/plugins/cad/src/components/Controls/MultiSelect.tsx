import { SelectItem } from '@backstage/core-components';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MaterialSelect,
} from '@material-ui/core';
import React, { ChangeEvent } from 'react';

type MultiSelectProps = {
  label: string;
  value: string[];
  items: SelectItem[];
  onChange: (items: string[]) => void;
  className?: string;
  helperText?: string;
};

export const MultiSelect = ({
  label,
  value,
  items,
  onChange,
  className,
  helperText,
}: MultiSelectProps) => {
  const handleChange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ): void => {
    onChange(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth variant="outlined" className={className}>
      <InputLabel id="select-label">{label}</InputLabel>
      <MaterialSelect
        labelId="select-label"
        multiple
        value={value}
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
