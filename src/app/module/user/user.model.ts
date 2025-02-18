import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";


const UserSchema = new Schema<TUser>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      phone: { type: String, required: true },
      password: { type: String, required: true },
      role: { type: String, enum: ["customer", "admin"], default: "customer" },
      wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
  );
  
  export const User = model<TUser>("User", UserSchema);