import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

import { IList } from 'src/app/core/models/list.model';
import { ListService } from 'src/app/core/services/list/list.service';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnFormComponent {
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    if (this.columnForm)
      if (!this.columnForm.nativeElement.contains(event.target)) this.closeColumnForm();
  }

  @ViewChild('listInput', { static: false })
  set listInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }
  @ViewChild('columnForm') columnForm?: HTMLFormElement;

  isVisibleColumnForm = false;
  title = '';

  constructor(private listService: ListService) {}

  closeColumnForm(): void {
    this.title = '';
    this.isVisibleColumnForm = false;
  }

  addList(list: IList): void {
    this.listService.addList(list);
    this.title = '';
  }
}
