import mongoose from "mongoose";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";


const createOrderFromDB = async (orderData: TOrder, id:string): Promise<TOrder> => {
  

  orderData.customer = new mongoose.Types.ObjectId(id)

  // console.log('order data', orderData)

  const order = new Order(orderData);
  await order.save();
  return order;
};

const getAllOrdersFromDB = async() => {

    const orders = await Order.find().populate("customer", "name email")
    return orders
}


const getOrderByIdFromDB = async (orderId: string): Promise<TOrder | null> => {
  return await Order.findById(orderId).populate('customer products.product');
};

const getOrdersByCustomerIdFromDB = async (customerId: string): Promise<TOrder[]> => {
  return await Order.find({ customer: customerId }).populate('products.product');
};

const updateOrderStatusFromDB = async (
  orderId: string,
  status: TOrder['status']
): Promise<TOrder | null> => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};



export const orderService = {
    createOrderFromDB,
    getAllOrdersFromDB,
    getOrderByIdFromDB,
    getOrdersByCustomerIdFromDB,
    updateOrderStatusFromDB
}