import { TextField } from '@material-ui/core';
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import React, { ChangeEvent, useEffect, useRef } from 'react';

type AutocompleteProps = {
  label: string;
  options: string[];
  value: string;
  onInputChange: (newValue: string) => void;
};

export const Autocomplete = ({
  label,
  options,
  value,
  onInputChange,
}: AutocompleteProps) => {
  const thisValue = useRef<string>(value);
  const inputValue = useRef<string>(value);

  useEffect(() => {
    if (inputValue.current !== value) {
      thisValue.current = value;
      inputValue.current = value;
    }
  }, [value]);

  const onAutocompleteChange = (
    _: ChangeEvent<{}>,
    newValue: string | null,
  ): void => {
    thisValue.current = newValue as string;
  };

  const onAutocompleteInputChange = (
    _: ChangeEvent<{}>,
    newValue: string,
  ): void => {
    inputValue.current = newValue;
    onInputChange(inputValue.current);
  };

  return (
    <MaterialAutocomplete
      fullWidth
      options={options}
      renderInput={params => (
        <TextField {...params} label={label} variant="outlined" fullWidth />
      )}
      onChange={onAutocompleteChange}
      onInputChange={onAutocompleteInputChange}
      value={thisValue.current}
      inputValue={inputValue.current}
    />
  );
};
