import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';

import { ICard } from './../../models/card.model';
import { IList } from './../../models/list.model';
import { IPriority, priorities } from '../../models/priority.model';
import { CardService } from '../../services/card/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() list?: IList;
  @Input() card?: ICard;

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (this.editForm)
      if (!this.editForm.nativeElement.contains(event.target)) this.closeEditForm();
  }

  @ViewChild('editForm') editForm?: HTMLFormElement;

  priorities: IPriority[] = priorities;
  isVisibleCard = false;
  selectedPriority?: number;
  currentContent = '';
  currentOwner = '';

  constructor(private readonly cardService: CardService) {}

  myColorVariable(priority: number): string {
    return priorities[priority - 1].bgColor;
  }

  openEditForm(event: Event): void {
    event.stopPropagation();

    if (this.card) {
      this.isVisibleCard = true;
      this.selectedPriority = this.priorities[this.card.priority - 1].value;
      this.currentContent = this.card.content;
      this.currentOwner = this.card.owner.name;
    }
  }

  closeEditForm(): void {
    if (this.list && this.list.id && this.selectedPriority && this.card && this.card.id) {
      if (!this.currentContent || !this.currentOwner) {
        this.isVisibleCard = false;
        return;
      }

      this.cardService.editCard({
        id: this.card.id,
        listId: this.list.id,
        currentIndex: this.card.currentIndex,
        priority: this.selectedPriority,
        content: this.currentContent,
        owner: { name: this.currentOwner },
      });
    }

    this.isVisibleCard = false;
  }

  removeCard(id: number): void {
    this.cardService.removeCard(id);
  }
}
