import { NextFunction, Request, Response } from "express";
import { categoryService } from "./categoryService";

async function getCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
        });

    } catch (error) {
        next(error)
    }
}

export const categoryController = { getCategories }