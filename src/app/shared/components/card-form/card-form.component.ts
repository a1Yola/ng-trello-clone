import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ICard } from 'src/app/core/models/card.model';
import { IList } from 'src/app/core/models/list.model';
import { IPriority, priorities } from 'src/app/core/models/priority.model';
import { CardService } from 'src/app/core/services/card/card.service';
import { formatField } from '../../utils';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFormComponent {
  @Input() list?: IList;
  @Input() isVisibleForm?: boolean;
  @Output() changeIsVisibleForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  priorities: IPriority[] = priorities;
  selectedPriority: number = this.priorities[0].value;
  content = '';
  ownerName = '';

  constructor(private readonly cardService: CardService) {}

  addCard(card: ICard): void {
    const validCardContent = formatField(card.content);
    const validOwnerName = formatField(card.owner.name);

    if (validCardContent && validOwnerName) {
      this.cardService.addCard(card);
      this.closeCardForm();
    }
  }

  identifyOptionByValue(index: number, option: IPriority): number {
    return option.value;
  }

  closeCardForm(): void {
    this.content = '';
    this.ownerName = '';
    this.selectedPriority = this.priorities[0].value;
    this.isVisibleForm = false;
    this.changeIsVisibleForm.emit(this.isVisibleForm);
  }
}
