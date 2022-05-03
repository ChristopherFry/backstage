import { TextField } from '@material-ui/core';
import React, { Fragment } from 'react';
import { EditorAccordion, OnAccordionChange } from './EditorAccordion';

type OnValueUpdated = (value: string) => void;

type SingleTextFieldAccordionProps = {
  title: string;
  expanded: boolean;
  onChange: OnAccordionChange;
  value: string;
  onValueUpdated: OnValueUpdated;
};

export const SingleTextFieldAccordion = ({
  title,
  expanded,
  onChange,
  value,
  onValueUpdated,
}: SingleTextFieldAccordionProps) => {
  return (
    <EditorAccordion
      title={title}
      description={value}
      expanded={expanded}
      onChange={onChange}
    >
      <Fragment>
        <TextField
          label={title}
          variant="outlined"
          value={value}
          onChange={e => onValueUpdated(e.target.value)}
          fullWidth
        />
      </Fragment>
    </EditorAccordion>
  );
};
