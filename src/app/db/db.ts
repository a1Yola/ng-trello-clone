import Dexie, { Table } from 'dexie';

import { ICard } from 'src/app/core/models/card.model';
import { IList } from 'src/app/core/models/list.model';

export class AppDB extends Dexie {
  lists!: Table<IList, number>;
  cards!: Table<ICard, number>;

  constructor() {
    super('trelloDB');
    this.version(3).stores({
      lists: '++id',
      cards: '++id, listId',
    });
  }
}

export const db = new AppDB();
