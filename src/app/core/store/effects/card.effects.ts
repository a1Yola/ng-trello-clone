import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  catchError,
  map,
  of,
  mergeMap
} from 'rxjs';

import { DBService } from 'src/app/core/services/db/db.service';
import {
  loadCards,
  loadCardsSuccess,
  loadCardsFailure,
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
  transferCard,
  moveCard,
  moveCardSuccess,
  moveCardFailure,
} from './../actions/card.actions';

@Injectable()
export class CardEffects {
  constructor(private actions$: Actions, private indexDBService: DBService) {}

  private loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCards),
      mergeMap(() =>
        this.indexDBService.getCards().pipe(
          map(cards => loadCardsSuccess({ cards })),
          catchError((error: string) => of(loadCardsFailure({ error })))
        )
      )
    )
  );

  private addCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCard),
      mergeMap(action =>
        this.indexDBService.addCard(action.card).pipe(
          map(cards => addCardSuccess({ cards })),
          catchError((error: string) => of(addCardFailure({ error })))
        )
      )
    )
  );

  private editCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editCard),
      mergeMap(action =>
        this.indexDBService.editCard(action.card).pipe(
          map(cards => editCardSuccess({ cards })),
          catchError((error: string) => of(editCardFailure({ error })))
        )
      )
    )
  );

  private removeCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCard),
      mergeMap(action =>
        this.indexDBService.removeCard(action.id).pipe(
          map(cards => removeCardSuccess({ cards })),
          catchError((error: string) => of(removeCardFailure({ error })))
        )
      )
    )
  );

  private moveCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moveCard),
      mergeMap(action =>
        this.indexDBService.moveCard(action.arrayOfId).pipe(
          map(cards => moveCardSuccess({ cards })),
          catchError(error => of(moveCardFailure({ error })))
        )
      )
    )
  );

  private transferCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transferCard),
      mergeMap(action =>
        this.indexDBService
          .transferCard(action.cardId, action.listId, action.arrayOfId)
          .pipe(
            map(cards => transferCardSuccess({ cards })),
            catchError(error => of(transferCardFailure({ error })))
          )
      )
    )
  );
}
