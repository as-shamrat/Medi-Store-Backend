import { NextFunction, Request, Response } from "express";
import { medicineService } from "./medicineService";

async function getAllMedicines(req: Request, res: Response, next: NextFunction) {
    try {
        const medicines = await medicineService.getAllMedicines();
        res.status(200).json({
            success: true,
            message: 'medicines fetched successfully',
            data: medicines
        })
    }
    catch (error: any) {
        next(error)
    }
}

async function getMedicineById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const medicine = await medicineService.getMedicineById(id as string);
        res.status(200).json({
            success: true,
            message: 'medicine fetched by id successfully',
            data: medicine
        })
    }
    catch (error: any) {
        next(error)
    }
}


export const medicineController = { getAllMedicines, getMedicineById }