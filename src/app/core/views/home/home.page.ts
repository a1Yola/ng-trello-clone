import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

import { ListService } from '../../services/list/list.service';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';
import { EDraggableItems } from '../../enums/draggable-items.enum';
import { IList } from '../../models/list.model';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  lists$: Observable<IList[]>;

  constructor(
    private listService: ListService,
    private dragAndDropService: DragAndDropService
  ) {
    this.lists$ = this.listService.getLists();
  }

  identifyListById(index: number, list: IList) {
    return list.id;
  }

  drop(event: CdkDragDrop<IList[]>) {
    this.dragAndDropService.drop(event, EDraggableItems.List);
  }
}
