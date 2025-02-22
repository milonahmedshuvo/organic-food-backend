import { NextFunction, Request, Response } from "express";
import { productService } from "./product.service";
import AppError from "../../error/appError";

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.createProductFromDB(req.body.data)
      res.status(201).json({ 
        status: true,
        message: 'Product created successfully',
        data: product
       });
    } catch (error) {
      next(error);
    }
  };


  const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getAllProductsFromDB()
      res.status(200).json({
        status: true,
        message: 'product retrive succesfull',
        data: products
      });
    } catch (error) {
      next(error);
    }
  };


  const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.getProductByIdFromDB(req.params.id);
      if (!product) {
        throw new AppError(404, 'Product not found')
      }


      res.status(200).json({
        status: true,
        message: 'Product updated successfully',
        data: product
      });
    } catch (error) {
      next(error);
    }
  };

  
  const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.updateProductFromDB(req.params.id, req.body);
      if (!product) {
        throw new AppError(404, 'Product not found')
      }
      res.status(200).json({
        status: true, 
        message: 'Product updated successfully',
        data: product 
    });
    } catch (error) {
      next(error);
    }
  };


  const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.deleteProductFromDB(req.params.id);
      if (!product) {
        throw new AppError(404, 'Product not found')
      }
      res.status(200).json({ 
        status: true,
        message: 'Product deleted successfully',
        data: product
    });
    } catch (error) {
      next(error);
    }
  };



export const productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}