import { Item } from './item.model';

export class Order {
  constructor(public id: string, public email: string, public items: Item[]) {}
}
