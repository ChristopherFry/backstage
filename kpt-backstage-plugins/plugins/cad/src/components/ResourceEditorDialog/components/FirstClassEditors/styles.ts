import { makeStyles } from '@material-ui/core';

export const useEditorStyles = makeStyles({
  root: {
    margin: '2px',
  },
  multiControlRow: {
    display: 'flex',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginRight: '8px',
    },
  },
  buttonRow: {
    marginTop: '12px',
    '& > button': {
      marginRight: '8px',
    },
  },
  iconButton: {
    height: '42px',
    width: '42px',
  },
});
