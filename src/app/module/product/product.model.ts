import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";


const ProductSchema = new Schema<TProduct>(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      category: { type: String, required: true },
      image: { type: String, required: true },
      currency: { type: String, enum: ["BDT", "USD"], default: "BDT" },
    },
    { timestamps: true }
  );
  
  export const Product = model<TProduct>("Product", ProductSchema);