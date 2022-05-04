import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { ChangeEvent, ReactNode, useEffect, useRef } from 'react';

export type OnAccordionChange = (
  event: ChangeEvent<{}>,
  newExpanded: boolean,
) => void;

type EditorAccordionProps = {
  title: string;
  description?: string;
  expanded: boolean;
  onChange: OnAccordionChange;
  children: ReactNode;
};

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: theme.typography.pxToRem(15),
    width: '30%',
    flexShrink: 0,
  },
  description: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionDetails: {
    display: 'block',
    width: '100%',
    '& > *:not(:last-child)': {
      marginBottom: '12px',
    },
  },
}));

export const EditorAccordion = ({
  title,
  description,
  expanded,
  onChange,
  children,
}: EditorAccordionProps) => {
  const classes = useStyles();
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded && detailsRef.current) {
      setTimeout(
        () =>
          detailsRef.current?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
          }),
        100,
      );
    }
  }, [expanded]);

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.description}>{description}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.accordionDetails} ref={detailsRef}>
          {children}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
