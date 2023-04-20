import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { IList } from '../../models/list.model';
import { ICard } from '../../models/card.model';
import { EDraggableItems } from '../../enums/draggable-items.enum';
import { formatField } from 'src/app/shared/utils';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';
import { ListService } from '../../services/list/list.service';
import { CardService } from '../../services/card/card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @Input() list?: IList;

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (this.cardForm)
      if (!this.cardForm.nativeElement.contains(event.target)) this.closeCardForm(false);
  }

  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;
  @ViewChild('titleInput', { static: false }) titleInput?: ElementRef<HTMLInputElement>;
  @ViewChild('cardForm', { static: false }) cardForm?: HTMLFormElement;

  cards$: Observable<ICard[]> | null = null;
  status$?: Observable<string>;
  isVisibleEditForm = false;
  isVisibleCardForm = false;
  title = '';

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly listService: ListService,
    private readonly cardService: CardService,
    private readonly dragAndDropService: DragAndDropService
  ) {}

  ngOnInit(): void {
    if (this.list && this.list.id) {
      this.cards$ = this.cardService.getCards(this.list.id);
      this.status$ = this.cardService.getStatus();
    }
  }

  public identifyCardById(index: number, card: ICard) {
    return card.id;
  }

  openEditForm(): void {
    if (this.list) {
      this.title = this.list.title;
      this.isVisibleEditForm = true;
      this._changeDetectorRef.detectChanges();

      setTimeout(() => {
        if (this.titleInput) this.titleInput.nativeElement.focus();
      });
    }
  }

  closeEditForm(id: number): void {
    if (this.list) {
      const validTitle = formatField(this.title);
      const currentIndex = this.list.currentIndex;

      if (validTitle && currentIndex) {
        if (validTitle === this.list.title) this.isVisibleEditForm = false;

        this.listService.editList(id, validTitle, currentIndex);
      }

      this.isVisibleEditForm = false;
    }
  }

  removeList(id: number): void {
    this.listService.removeList(id);
  }

  drop(event: CdkDragDrop<ICard[]>) {
    if (this.list) {
      this.dragAndDropService.drop(event, EDraggableItems.Card, this.list.id);
    }
  }

  closeCardForm(event: boolean): void {
    this.isVisibleCardForm = event;
  }
}
