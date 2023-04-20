import { IDraggableItem } from './draggable-item.model';
import { IUser } from './user.model';

export interface ICard extends IDraggableItem {
  listId: number;
  priority: number;
  content: string;
  owner: IUser;
}
