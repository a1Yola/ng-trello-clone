import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ICardState } from './../reducers/card.reducer';
import { ICard } from '../../models/card.model';
import { CARDS_FEATURE } from 'src/app/shared/constants';

export const selectCards = createFeatureSelector<ICardState>(CARDS_FEATURE);

export const selectListCards = (listId?: number) =>
  createSelector(selectCards, (state: ICardState): ICard[] => {
    if (listId === undefined) {
      throw new Error('list id is undefined');
    }

    const filteredCards = [...state.cards].filter(card => card.listId === listId);

    if (!filteredCards.length) return [];

    return filteredCards;
  });

export const selectError = createSelector(
  selectCards,
  (state: ICardState) => state.error
);

export const selectStatus = createSelector(
  selectCards,
  (state: ICardState) => state.status
);
