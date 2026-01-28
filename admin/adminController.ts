import { Request, Response } from "express";
import { adminService } from "./adminService";

async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await adminService.getAllUsers();
        console.log('users: ', users)
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users
        })

    } catch (error: any) {
        console.error("Get users error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
}


async function updateUser(req: Request, res: Response) {
    console.log('Body: ', req.body)
    try {
        const id = req.params.id;
        const { status } = req.body


        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            });
        }


        const user = await adminService.updateUser(id as string, status);
        console.log('updatedUser: ', user)
        res.status(200).json({
            success: true,
            message: 'User status updated successfully',
            data: user
        })

    } catch (error: any) {
        console.error("Update user error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update user",
        });
    }
}

export const adminController = { getAllUsers, updateUser }