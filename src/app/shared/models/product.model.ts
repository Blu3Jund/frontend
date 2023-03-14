// import mongoose from "mongoose";

import { Image } from './image.model';
import { Categories } from './categories.model';
import { Item } from './item.model';

export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public image: Image,
    public items: Item[],
    public categories: Categories[],
  ) {}
}
