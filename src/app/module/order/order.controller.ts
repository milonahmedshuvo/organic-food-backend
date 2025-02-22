import { Request, Response, NextFunction } from 'express';
import { orderService } from './order.service';
import AppError from '../../error/appError';


 const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const order = await orderService.createOrderFromDB(req.body, req.user.id)
    res.status(201).json({ 
        status: true,
        message: 'Order created successfully',
        data: order
     });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const orders = await orderService.getAllOrdersFromDB()

    res.status(200).json({
        status: true,
        message: 'Orders retrive successfull',
        data : orders
    })
    }catch(err){
        next(err)
    }
}

 const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderService.getOrderByIdFromDB(req.params.id);
    if (!order) {
      throw new AppError(404, 'Order not found')
    }
    res.status(200).json({
        status: true,
        message: 'Order retrive successfull',
        data: order
    });
  } catch (error) {
    next(error);
  }
};

 const getOrdersByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderService.getOrdersByCustomerIdFromDB(req.params.customerId);
    res.status(200).json({
        status: true,
        message: 'Order retrive successfull',
        data: orders
    });
  } catch (error) {
    next(error);
  }
};

 const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderService.updateOrderStatusFromDB(req.params.id, req.body.status);
    if (!order) {
      throw new AppError(404, 'Order not found')
    }
    res.status(200).json({ 
        status: true,
        message: 'Order status updated successfully',
        data: order 
    });
  } catch (error) {
    next(error);
  }
};


export const orderController = {
    createOrder,
    getOrders,
    getOrderById,
    getOrdersByCustomerId,
    updateOrderStatus
}