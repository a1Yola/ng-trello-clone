import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LISTS_FEATURE } from 'src/app/shared/constants';
import { IListState } from '../reducers/list.reducer';

export const selectLists = createFeatureSelector<IListState>(LISTS_FEATURE);

export const selectAllLists = createSelector(selectLists, (state: IListState) => {
  if (state.lists.length === 0) return [];

  return [...state.lists];
});

export const selectError = createSelector(
  selectLists,
  (state: IListState) => state.error
);

export const selectStatus = createSelector(
  selectLists,
  (state: IListState) => state.status
);
