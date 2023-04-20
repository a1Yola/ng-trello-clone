import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IList } from '../../models/list.model';
import { formatField } from 'src/app/shared/utils';
import { selectAllLists } from '../../store/selectors/list.selectors';
import {
  addList,
  editList,
  loadLists,
  removeList,
} from '../../store/actions/list.actions';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private readonly _store: Store) {
    this.loadLists();
  }

  private loadLists(): void {
    this._store.dispatch(loadLists());
  }

  public getLists(): Observable<IList[]> {
    return this._store.select(selectAllLists);
  }

  public addList(list: IList): void {
    if (formatField(list.title)) this._store.dispatch(addList({ list }));
  }

  public editList(id: number, title: string, currentIndex: number) {
    this._store.dispatch(editList({ list: { id, title, currentIndex } }));
  }

  public removeList(id: number): void {
    this._store.dispatch(removeList({ id }));
  }
}
