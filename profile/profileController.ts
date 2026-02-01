
import { NextFunction, Request, Response } from "express";
import { profileService } from "./profileService";

async function updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, phone, address } = req.body
        console.log('reqbody: ', req.body)
        const profile = await profileService.updateProfile(req.user?.id as string, { name, email, phone, address })
        res.json({ success: true, data: profile })
    }
    catch (error: any) {
        next(error)
    }
}

export const profileController = { updateProfile }