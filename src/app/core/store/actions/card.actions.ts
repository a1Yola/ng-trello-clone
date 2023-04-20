import { createAction, props } from '@ngrx/store';

import { ICard } from './../../models/card.model';

enum ECardsActionTypes {
  LoadCards = '[Card Service] Load Cards',
  LoadCardsSuccess = '[Card Effects] Load Cards Success',
  LoadCardsFailure = '[Card Effects] Load Cards Failure',
  AddCard = '[Card Service] Add Card',
  AddCardSuccess = '[Card Effects] Add Card Success',
  AddCardFailure = '[Card Effects] Add Card Failure',
  EditCard = '[Card Service] Edit Card',
  EditCardSuccess = '[Card Effects] Edit Card Success',
  EditCardFailure = '[Card Effects] Edit Card Failure',
  RemoveCard = '[Card Service] Remove Card',
  RemoveCardSuccess = '[Card Effects] Remove Card Success',
  RemoveCardFailure = '[Card Effects] Remove Card Failure',
  TransferCard = '[Drag and Drop Service] Transfer Card',
  TransferCardSuccess = '[Card Effects] Transfer Card Success',
  TransferCardFailure = '[Card Effects] Transfer Card Failure',
  MoveCard = '[Drag and Drop Service] Move Card',
  MoveCardSuccess = '[Card Effects] Move Card Success',
  MoveCardFailure = '[Card Effects] Move Card Failure',
}

export const loadCards = createAction(ECardsActionTypes.LoadCards);

export const loadCardsSuccess = createAction(
  ECardsActionTypes.LoadCardsSuccess,
  props<{ cards: ICard[] }>()
);

export const loadCardsFailure = createAction(
  ECardsActionTypes.LoadCardsFailure,
  props<{ error: string }>()
);

export const addCard = createAction(ECardsActionTypes.AddCard, props<{ card: ICard }>());

export const addCardSuccess = createAction(
  ECardsActionTypes.AddCardSuccess,
  props<{ cards: ICard[] }>()
);

export const addCardFailure = createAction(
  ECardsActionTypes.AddCardFailure,
  props<{ error: string }>()
);

export const editCard = createAction(
  ECardsActionTypes.EditCard,
  props<{ card: ICard }>()
);

export const editCardSuccess = createAction(
  ECardsActionTypes.EditCardSuccess,
  props<{ cards: ICard[] }>()
);

export const editCardFailure = createAction(
  ECardsActionTypes.EditCardFailure,
  props<{ error: string }>()
);

export const removeCard = createAction(
  ECardsActionTypes.RemoveCard,
  props<{ id: number }>()
);

export const removeCardSuccess = createAction(
  ECardsActionTypes.RemoveCardSuccess,
  props<{ cards: ICard[] }>()
);

export const removeCardFailure = createAction(
  ECardsActionTypes.RemoveCardFailure,
  props<{ error: string }>()
);

export const transferCard = createAction(
  ECardsActionTypes.TransferCard,
  props<{ cardId: number; listId: number; arrayOfId: number[] }>()
);

export const transferCardSuccess = createAction(
  ECardsActionTypes.TransferCardSuccess,
  props<{ cards: ICard[] }>()
);

export const transferCardFailure = createAction(
  ECardsActionTypes.TransferCardFailure,
  props<{ error: string }>()
);

export const moveCard = createAction(
  ECardsActionTypes.MoveCard,
  props<{ arrayOfId: number[] }>()
);

export const moveCardSuccess = createAction(
  ECardsActionTypes.MoveCardSuccess,
  props<{ cards: ICard[] }>()
);

export const moveCardFailure = createAction(
  ECardsActionTypes.MoveCardFailure,
  props<{ error: string }>()
);
