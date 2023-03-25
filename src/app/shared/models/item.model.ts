import { Variation } from './variation.model';

export interface ItemInterface {
  sku: string;
  quantity_in_stock: number;
  price: number;
  image: string;
  variations: Variation[];
}

export class Item implements ItemInterface {
  constructor(
    public sku: string,
    public quantity_in_stock: number,
    public price: number,
    public image: string,
    public variations: Variation[],
  ) {}
}
