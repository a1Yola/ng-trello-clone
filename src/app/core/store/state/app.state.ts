import { ICardState } from '../reducers/card.reducer';
import { IListState } from '../reducers/list.reducer';

export interface IAppState {
  lists: IListState;
  cards: ICardState;
}
