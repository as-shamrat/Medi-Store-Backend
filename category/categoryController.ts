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
async function addCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body
        const categories = await categoryService.addCategory(data);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: categories,
        });

    } catch (error) {
        next(error)
    }
}
async function updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body
        const categoryId = req.params.id;
        const categories = await categoryService.updateCategory(categoryId as string, data);
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: categories,
        });

    } catch (error) {
        next(error)
    }
}

export const categoryController = { getCategories, addCategory, updateCategory }