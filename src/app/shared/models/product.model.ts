// import mongoose from "mongoose";

import { Upload } from "./upload.model";
import { Categories } from "./categories.model";
import { Item } from "./item.model";

export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public upload: Upload,
    public items: Item[],
    public categories: Categories[]
  ) {}
}

// interface ProductDoc extends mongoose.Document {
//   name: string;
//   description: string;
//   image?: mongoose.Types.Array<{
//     file_name: string;
//     file: Buffer;
//     upload_time: Date;
//   }>;
//   product_item?: mongoose.Types.Array<{
//     product_item_id: string;
//     SKU: string;
//     quantity_in_stock: number;
//     price: number;
//     image?: mongoose.Types.Array<{
//       file_name: string;
//       file: Buffer;
//       upload_time: Date;
//     }>;
//     variation?: mongoose.Types.Array<{
//       variation_name: string;
//       variation_option: mongoose.Types.Array<string>;
//     }>;
//   }>;
//   category?: mongoose.Types.Array<{
//     name: string;
//     parentId: string;
//   }>;
//   version: number;
//   orderId?: string;
// }
//
// interface ProductModel extends mongoose.Model<ProductDoc> {
//   build(attrs: ProductAttrs): ProductDoc;
// }
//
// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     upload: [
//       {
//         file_name: {
//           type: String,
//           required: true,
//         },
//         file: {
//           data: Buffer,
//           contentType: String,
//         },
//         upload_time: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//     items: [
//       {
//         product_item_id: {
//           type: String,
//           required: true,
//         },
//         sku: {
//           type: String,
//           required: true,
//         },
//         quantity_in_stock: {
//           type: Number,
//           required: true,
//           default: 0,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//         upload: [
//           {
//             file_name: {
//               type: String,
//               required: true,
//             },
//             file: {
//               data: Buffer,
//               contentType: String,
//             },
//             upload_time: {
//               type: Date,
//               default: Date.now,
//             },
//           },
//         ],
//         variations: [
//           {
//             variation_name: {
//               type: String,
//               required: true,
//             },
//             variation_option: [
//               {
//                 type: String,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     categories: [
//       {
//         name: {
//           type: String,
//           required: true,
//         },
//         parent_id: String,
//       },
//     ],
//   },
//   {
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//       },
//     },
//   }
// );
// productSchema.set("versionKey", "version");
//
// // productSchema.plugin(updateIfCurrentPlugin);
//
// productSchema.statics.build = (attrs: ProductAttrs) => {
//   return new Product(attrs);
// };
//
// const Product = mongoose.model<ProductDoc, ProductModel>(
//   "Product",
//   productSchema
// );
//
// export { Product };
