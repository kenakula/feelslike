export type FilterType = 'feel' | 'regular' | 'all';
export type SortOrder = 'asc' | 'desc';

export interface FilterParams {
  type: FilterType;
  sortOrder: SortOrder;
}
