import { createReducer, on } from '@ngrx/store';

import {
  loadCards,
  loadCardsFailure,
  loadCardsSuccess,
  addCard,
  addCardSuccess,
  addCardFailure,
  removeCard,
  removeCardSuccess,
  removeCardFailure,
  editCard,
  editCardSuccess,
  editCardFailure,
  transferCardSuccess,
  transferCardFailure,
  moveCardSuccess,
  moveCardFailure,
} from './../actions/card.actions';
import { ICard } from './../../models/card.model';
import { EActionStatus } from '../../enums/action-status.enum';

export interface ICardState {
  cards: ICard[];
  error: string | null;
  status: EActionStatus;
}

export const initialState: ICardState = {
  cards: [],
  error: null,
  status: EActionStatus.Pending,
};

export const cardReducer = createReducer(
  initialState,

  on(loadCards, addCard, editCard, removeCard, state => ({
    ...state,
    error: null,
    status: EActionStatus.Loading,
  })),

  on(
    loadCardsSuccess,
    addCardSuccess,
    editCardSuccess,
    removeCardSuccess,
    transferCardSuccess,
    moveCardSuccess,
    (state, { cards }) => ({
      ...state,
      error: null,
      cards,
      status: EActionStatus.Success,
    })
  ),

  on(
    loadCardsFailure,
    addCardFailure,
    editCardFailure,
    removeCardFailure,
    transferCardFailure,
    moveCardFailure,
    (state, { error }) => ({
      ...state,
      error,
      status: EActionStatus.Error,
    })
  )
);
