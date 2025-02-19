import { TProduct } from "./product.interface";
import { Product } from "./product.model";


const createProductFromDB = async (productData:TProduct ) => {
    const product = new Product(productData);
    await product.save();
    return product;
};


const getAllProductsFromDB = async (): Promise<TProduct[]> => {
    return await Product.find();
  };
  
  const getProductByIdFromDB = async (productId: string): Promise<TProduct | null> => {
    return await Product.findById(productId);
  };

  const updateProductFromDB= async (
    productId: string,
    productData: Partial<TProduct>
  ): Promise<TProduct | null> => {
    return await Product.findByIdAndUpdate(productId, productData, { new: true });
  };
  
  const deleteProductFromDB= async (productId: string): Promise<TProduct | null> => {
    return await Product.findByIdAndDelete(productId);
  };


export const productService = {
    createProductFromDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    updateProductFromDB,
    deleteProductFromDB
}