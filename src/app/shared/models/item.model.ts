import { Upload } from "./upload.model";
import { Variation } from "./variation.model";

export interface ItemInterface {
  sku: string;
  quantity_in_stock: number;
  price: number;
  upload: Upload;
  variations: Variation[];
}

export class Item implements ItemInterface {
  constructor(
    public sku: string,
    public quantity_in_stock: number,
    public price: number,
    public upload: Upload,
    public variations: Variation[]
  ) {}
}
