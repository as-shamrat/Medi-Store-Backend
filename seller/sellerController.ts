import { NextFunction, Request, Response } from "express";
import { sellerService } from "./sellerService";

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

export const sellerController = { addMedicine, updateMedicine }