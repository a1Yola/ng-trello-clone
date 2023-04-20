import { createAction, props } from '@ngrx/store';

import { IList } from '../../models/list.model';

enum EListActionTypes {
  LoadLists = '[List Service] Load Lists',
  LoadListsSuccess = '[List Effects] Load Lists Success',
  LoadListsFailure = '[List Effects] Load Lists Failure',
  AddList = '[List Service] Add List',
  AddListSuccess = '[List Effects] Add List Success',
  AddListFailure = '[List Effects] Add List Failure',
  EditList = '[List Service] Edit List',
  EditListSuccess = '[List Effects] Edit List Success',
  EditListFailure = '[List Effects] Edit List Failure',
  RemoveList = '[List Service] Remove List',
  RemoveListSuccess = '[List Effects] Remove List Success',
  RemoveListFailure = '[List Effects] Remove List Failure',
  MoveList = '[Drag and Drop Service] Move List',
  MoveListSuccess = '[List Effects] Move List Success',
  MoveListFailure = '[List Effects] Move List Failure',
}

export const loadLists = createAction(EListActionTypes.LoadLists);

export const loadListsSuccess = createAction(
  EListActionTypes.LoadListsSuccess,
  props<{ lists: IList[] }>()
);

export const loadListsFailure = createAction(
  EListActionTypes.LoadListsFailure,
  props<{ error: string }>()
);

export const addList = createAction(
  EListActionTypes.AddList,
  props<{ list: IList }>()
);

export const addListSuccess = createAction(
  EListActionTypes.AddListSuccess,
  props<{ lists: IList[] }>()
);

export const addListFailure = createAction(
  EListActionTypes.AddListFailure,
  props<{ error: string }>()
);

export const editList = createAction(
  EListActionTypes.EditList,
  props<{ list: IList }>()
);

export const editListSuccess = createAction(
  EListActionTypes.EditListSuccess,
  props<{ lists: IList[] }>()
);

export const editListFailure = createAction(
  EListActionTypes.EditListFailure,
  props<{ error: string }>()
);

export const removeList = createAction(
  EListActionTypes.RemoveList,
  props<{ id: number }>()
);

export const removeListSuccess = createAction(
  EListActionTypes.RemoveListSuccess,
  props<{ lists: IList[] }>()
);

export const removeListFailure = createAction(
  EListActionTypes.RemoveListFailure,
  props<{ error: string }>()
);

export const moveList = createAction(
  EListActionTypes.MoveList,
  props<{ arrayOfId: number[] }>()
);

export const moveListSuccess = createAction(
  EListActionTypes.MoveListSuccess,
  props<{ lists: IList[] }>()
);

export const moveListFailure = createAction(
  EListActionTypes.MoveListFailure,
  props<{ error: string }>()
);
