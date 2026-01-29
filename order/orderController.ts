import { NextFunction, Request, Response } from "express";
import { orderService } from "./orderService";

async function getOrders(req: Request, res: Response, next: NextFunction) {
    console.log('Query: ', req.query)
    const { page, limit } = req.query;
    const userId = req?.user?.id
    try {
        const orders = await orderService.getOrders(userId as string, { page: (page !== '0' && page || '1') as string, limit: (limit !== '0' && limit || '10') as string });
        res.status(200).json({
            success: true,
            message: 'orders fetched successfully',
            data: orders
        })
    }
    catch (error: any) {
        console.log(`Error at fetching orders: ${error}`)
        next(error)
    }
}
async function getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req?.user?.id
        const id = req.params.id;
        const order = await orderService.getOrderById(id as string)
        if (order?.customerId !== userId) {
            return res.status(403).json({ message: 'forbidden' })
        }
        res.status(200).json({ success: true, message: 'Order fetched successfully', data: order })
    }
    catch (error: any) {
        console.log('Error at fetching single order: ', error)
        next(error)
    }
}
async function createOrder(req: Request, res: Response, next: NextFunction) {
    try {
        // console.log('User: ', req.user)
        // console.log('Body: ', req.body)
        const order = await orderService.createOrder(req.user?.id as string, req.body)
        res.status(201).json({ success: true, message: 'Order created successfully', data: order })
    }
    catch (error: any) {
        console.log('Error: ', error)
        next(error)
    }
}


export const orderController = { getOrderById, getOrders, createOrder }