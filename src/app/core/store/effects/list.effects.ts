import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  of,
  mergeMap
} from 'rxjs';

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
  moveList,
  moveListFailure,
  moveListSuccess,
  removeList,
} from '../actions/list.actions';
import { DBService } from 'src/app/core/services/db/db.service';
import { IList } from '../../models/list.model';

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private indexDBService: DBService) {}

  private loadLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLists),
      mergeMap(() =>
        this.indexDBService.getLists().pipe(
          map((lists: IList[]) => loadListsSuccess({ lists })),
          catchError((error: string) => of(loadListsFailure({ error })))
        )
      )
    )
  );

  private addList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addList),
      mergeMap(action =>
        this.indexDBService.addList(action.list).pipe(
          map(lists => addListSuccess({ lists })),
          catchError((error: string) => of(addListFailure({ error })))
        )
      )
    )
  );

  private editList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editList),
      mergeMap(action =>
        this.indexDBService.editList(action.list).pipe(
          map(lists => editListSuccess({ lists })),
          catchError((error: string) => of(editListFailure({ error })))
        )
      )
    )
  );

  private removeList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeList),
      mergeMap(action =>
        this.indexDBService.removeList(action.id).pipe(
          map(lists => loadListsSuccess({ lists })),
          catchError((error: string) => of(loadListsFailure({ error })))
        )
      )
    )
  );

  private moveList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moveList),
      mergeMap(action =>
        this.indexDBService.moveList(action.arrayOfId).pipe(
          map(lists => moveListSuccess({ lists })),
          catchError(error => of(moveListFailure({ error })))
        )
      )
    )
  );
}
