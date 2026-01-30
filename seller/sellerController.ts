import { NextFunction, Request, Response } from "express";
import { sellerService } from "./sellerService";

async function getSellerOrders(req: Request, res: Response, next: NextFunction) {
    try {
        const sellerId = req.user?.id;
        const { page = '1', limit = '10' } = req.query
        const orders = await sellerService.getSellerOrders(sellerId as string, { page: page as string, limit: limit as string })
        // console.log({ orders })
        res.status(200).json({ success: true, message: 'Orders fetched successfully', data: orders })
    }
    catch (error: any) {
        console.log('Error at fetching orders: ', error)
        next(error)
    }
}

async function addMedicine(req: Request, res: Response, next: NextFunction) {
    try {
        const sellerId = req.user?.id;
        const data = req.body;
        const createdMedicine = await sellerService.addMedicine(sellerId as string, data)
        console.log({ createdMedicine })
        res.status(201).json({
            success: true,
            message: 'Medicine added successfully',
            data: createdMedicine
        })
    }
    catch (error: any) {
        console.log('Error at adding medicine: ', error)
        next(error)
    }
}
async function updateMedicine(req: Request, res: Response, next: NextFunction) {
    try {
        const medicineId = req.params.id;
        const sellerId = req.user?.id;
        if (!req.body.price && !req.body.stock) {
            return res.status(400).json({ success: false, message: "Provide price and/or stock" });
        }

        const updatedMedicine = await sellerService.updateMedicine(sellerId as string, medicineId as string, req.body)
        console.log({ updatedMedicine })
        res.status(200).json({
            success: true,
            message: 'Medicine updated successfully',
            data: updatedMedicine
        })
    }
    catch (error: any) {
        console.log('Error at updating medicine', error)
        next(error)
    }
}
async function deleteMedicine(req: Request, res: Response, next: NextFunction) {
    try {
        const medicineId = req.params.id;
        const sellerId = req.user?.id;

        const response = await sellerService.deleteMedicine(sellerId as string, medicineId as string)
        console.log({ response })
        res.status(200).json({
            success: true,
            message: 'Medicine deleted successfully',
        })
    }
    catch (error: any) {
        console.log('Error at deleting medicine', error)
        next(error)
    }
}

export const sellerController = { addMedicine, updateMedicine, deleteMedicine, getSellerOrders }