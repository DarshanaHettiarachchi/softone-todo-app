export interface TodoFilter {
  status: 'all' | 'pending' | 'completed';
  sortBy: 'created' | 'updated' | 'title';
  direction: 'asc' | 'desc';
}

export const DEFAULT_TODO_FILTER: TodoFilter = {
  status: 'all',
  sortBy: 'created',
  direction: 'asc',
};
