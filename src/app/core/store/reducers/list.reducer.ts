import { createReducer, on } from '@ngrx/store';
import {
  addList,
  addListFailure,
  addListSuccess,
  editList,
  editListFailure,
  editListSuccess,
  loadLists,
  loadListsFailure,
  loadListsSuccess,
  moveListFailure,
  moveListSuccess,
  removeList,
  removeListFailure,
  removeListSuccess,
} from '../actions/list.actions';
import { IList } from '../../models/list.model';
import { EActionStatus } from '../../enums/action-status.enum';

export interface IListState {
  lists: IList[];
  error: string | null;
  status: EActionStatus;
}

export const initialState: IListState = {
  lists: [],
  error: null,
  status: EActionStatus.Pending,
};

export const listReducer = createReducer(
  initialState,

  on(loadLists, addList, removeList, editList, state => ({
    ...state,
    error: null,
    status: EActionStatus.Loading,
  })),

  on(
    loadListsSuccess,
    addListSuccess,
    removeListSuccess,
    editListSuccess,
    moveListSuccess,
    (state, { lists }) => ({
      ...state,
      lists,
      error: null,
      status: EActionStatus.Success,
    })
  ),

  on(
    loadListsFailure,
    addListFailure,
    removeListFailure,
    editListFailure,
    moveListFailure,
    (state, { error }) => ({
      ...state,
      error,
      status: EActionStatus.Error,
    })
  )
);
