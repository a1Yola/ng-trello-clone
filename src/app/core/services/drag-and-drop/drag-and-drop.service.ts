import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { createArrayOfId } from 'src/app/shared/utils';
import { EDraggableItems } from '../../enums/draggable-items.enum';
import { IDraggableItem } from '../../models/draggable-item.model';
import { moveCard, transferCard } from '../../store/actions/card.actions';
import { moveList } from '../../store/actions/list.actions';

@Injectable({
  providedIn: 'root',
})
export class DragAndDropService {
  constructor(private readonly _store: Store) {}

  drop<T extends IDraggableItem>(
    event: CdkDragDrop<T[]>,
    draggableItem: EDraggableItems,
    listId?: number
  ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      const arrayOfId = createArrayOfId(event.container.data);

      if (draggableItem === EDraggableItems.List) {
        this._store.dispatch(moveList({ arrayOfId }));
      }

      if (draggableItem === EDraggableItems.Card) {
        this._store.dispatch(moveCard({ arrayOfId }));
      }
    } else {
      if (draggableItem === EDraggableItems.Card && listId) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );

        const cardId = event.container.data[event.currentIndex].id;

        if (cardId) {
          this._store.dispatch(
            transferCard({
              cardId,
              listId,
              arrayOfId: createArrayOfId(event.container.data),
            })
          );
        }
      }
    }
  }
}
