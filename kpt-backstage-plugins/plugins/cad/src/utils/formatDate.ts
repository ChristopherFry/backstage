import moment from 'moment';

export const formatCreationTimestamp = (timestamp?: string): string => {
  if (!timestamp) return '';

  return moment(timestamp).format('MMMM D, YYYY');
};
