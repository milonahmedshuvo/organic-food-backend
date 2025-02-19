// import {  Document } from "mongoose";

export interface IProduct  {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  currency: "BDT" | "USD";
  createdAt: Date;
}