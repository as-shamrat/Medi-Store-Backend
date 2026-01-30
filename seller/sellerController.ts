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

export const sellerController = { addMedicine }