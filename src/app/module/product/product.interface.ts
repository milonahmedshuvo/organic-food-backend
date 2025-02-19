// import {  Document } from "mongoose";

export interface TProduct  {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  currency: "BDT" | "USD";
}