import { SelectItem } from '@backstage/core-components';

export const sortByLabel = (selectItems: SelectItem[]): SelectItem[] => {
  const compareLabel = (item1: SelectItem, item2: SelectItem): number =>
    item1.label > item2.label ? 1 : -1;

  return selectItems.sort(compareLabel);
};
