import mongoose, { Document } from "mongoose";

export interface TOrder extends Document {
  customer: mongoose.Types.ObjectId;
  products: { product: mongoose.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  status: "Confirmed" | "Processing" | "Shipped" | "Delivered";
  paymentMethod: "Online Payment" | "Cash on Delivery";
  phone: string,
  city: string,
  zipCode : string,
}