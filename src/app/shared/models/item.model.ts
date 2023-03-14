import { Image } from './image.model';
import { Variation } from './variation.model';

export interface ItemInterface {
  sku: string;
  quantity_in_stock: number;
  price: number;
  image: Image;
  variations: Variation[];
}

export class Item implements ItemInterface {
  constructor(
    public sku: string,
    public quantity_in_stock: number,
    public price: number,
    public image: Image,
    public variations: Variation[],
  ) {}
}
