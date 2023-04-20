import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { formatField } from 'src/app/shared/utils';
import { ICard } from '../../models/card.model';
import {
  addCard,
  editCard,
  loadCards,
  removeCard,
} from '../../store/actions/card.actions';
import { selectListCards, selectStatus } from '../../store/selectors/card.selectors';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private readonly _store: Store) {
    this.loadCards();
  }

  private loadCards(): void {
    this._store.dispatch(loadCards());
  }

  public getCards(listId: number): Observable<ICard[]> {
    return this._store.select(selectListCards(listId));
  }

  public getStatus(): Observable<string> {
    return this._store.select(selectStatus);
  }

  public addCard(card: ICard): void {
    card.owner.id = Date.now();
    this._store.dispatch(addCard({ card }));
  }

  public editCard(card: ICard): void {
    const validContent = formatField(card.content);
    const validOwner = formatField(card.owner.name);

    if (validContent && validOwner) {
      this._store.dispatch(
        editCard({
          card: {
            id: card.id,
            listId: card.listId,
            currentIndex: card.currentIndex,
            priority: card.priority,
            content: validContent,
            owner: { name: validOwner },
          },
        })
      );
    }
  }

  public removeCard(id: number): void {
    this._store.dispatch(removeCard({ id }));
  }
}
