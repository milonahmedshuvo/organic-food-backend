import mongoose from "mongoose";

export interface TUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "customer" | "admin";
    wishlist?: mongoose.Types.ObjectId[];
  }