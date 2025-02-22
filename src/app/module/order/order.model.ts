import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>(
    {
      customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
      products: [
        {
          product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true },
        },
      ],
      totalAmount: { type: Number, required: true },
      status: { type: String, enum: ["Confirmed", "Processing", "Shipped", "Delivered"], default: "Confirmed" },
      paymentMethod: { type: String, enum: ["Online Payment", "Cash on Delivery"], required: true },
      phone : {type: String, required : true},
      city : { type : String, required: true },
      zipCode : {type: String, required: true}
    },
    { timestamps: true }
  );
  
  export const Order = model<TOrder>("Order", OrderSchema);