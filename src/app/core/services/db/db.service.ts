import { Injectable } from '@angular/core';
import {
  firstValueFrom,
  from,
  map,
  Observable,
  switchMap,
  zip
} from 'rxjs';

import { db } from 'src/app/db/db';
import { IList } from 'src/app/core/models/list.model';
import { ICard } from 'src/app/core/models/card.model';
import { CURRENT_INDEX } from 'src/app/shared/constants';

@Injectable({ providedIn: 'root' })
export class DBService {
  public getLists(): Observable<IList[]> {
    return from(db.lists.toCollection().sortBy(CURRENT_INDEX));
  }

  public addList(list: IList): Observable<IList[]> {
    return zip(db.lists.add(list), db.lists.toCollection().sortBy(CURRENT_INDEX)).pipe(
      map(([, lists]) => lists)
    );
  }

  public editList(list: IList): Observable<IList[]> {
    return zip(
      db.lists.put(list, list.id),
      db.lists.toCollection().sortBy(CURRENT_INDEX)
    ).pipe(map(([, lists]) => lists));
  }

  public removeList(id: number): Observable<IList[]> {
    return zip(
      db.lists.delete(id),
      db.cards.where({ listId: id }).delete(),
      db.lists.toCollection().sortBy(CURRENT_INDEX)
    ).pipe(map(([, , lists]) => lists));
  }

  public moveList(arrayOfId: number[]): Observable<IList[]> {
    arrayOfId.forEach(async (item, index) => {
      await db.lists.update(item, { currentIndex: index });
    });

    return from(db.lists.toCollection().sortBy(CURRENT_INDEX));
  }

  public getCards(): Observable<ICard[]> {
    return from(db.cards.toCollection().sortBy(CURRENT_INDEX));
  }

  public addCard(card: ICard): Observable<ICard[]> {
    return zip(db.cards.add(card), db.cards.toCollection().sortBy(CURRENT_INDEX)).pipe(
      map(([, cards]) => cards)
    );
  }

  public editCard(card: ICard): Observable<ICard[]> {
    return zip(
      db.cards.put(card, card.id),
      db.cards.toCollection().sortBy(CURRENT_INDEX)
    ).pipe(map(([, cards]) => cards));
  }

  public removeCard(id: number): Observable<ICard[]> {
    return zip(db.cards.delete(id), db.cards.toCollection().sortBy(CURRENT_INDEX)).pipe(
      map(([, cards]) => cards)
    );
  }

  public moveCard(arrayOfId: number[]): Observable<ICard[]> {
    arrayOfId.forEach(async (item, index) => {
      await db.cards.update(item, { currentIndex: index });
    });

    return from(db.cards.toCollection().sortBy(CURRENT_INDEX));
  }

  public transferCard(
    cardId: number,
    listId: number,
    arrayOfId: number[]
  ): Observable<ICard[]> {
    return from(db.cards.update(cardId, { listId })).pipe(
      switchMap(async () => {
        return await firstValueFrom(this.moveCard(arrayOfId));
      })
    );
  }
}
