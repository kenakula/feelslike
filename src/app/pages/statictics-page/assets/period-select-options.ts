import { SelectOption, TimePeriod } from 'app/shared/types';

export const periodSelectOptions: SelectOption<TimePeriod>[] = [
  {
    label: 'За всё время',
    value: 'all',
  },
  {
    label: 'За неделю',
    value: 'week',
  },
  {
    label: 'За месяц',
    value: 'month',
  },
  {
    label: 'За год',
    value: 'year',
  },
];
