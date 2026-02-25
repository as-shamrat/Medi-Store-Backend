// async function getProfile(req: Request, res: Response) {
//     try {
//         const session = await auth.api.getSession({ headers: req.headers as HeadersInit });
//         console.log('session: ', session)
//         res.json({ success: true, data: session?.user })
//     }
//     catch (error: any) {
//         console.log('Error: ', error.message)
//         res.status(401).json({ message: 'something went wrong' })
//     }
// }

import { Request, Response } from "express";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

async function register(req: Request, res: Response) {
    try {
        const data = await auth.api.signUpEmail({
            body: {
                ...req.body
            },
        });
        res.json({ success: true, data })
    }
    catch (error: any) {
        console.log('Error: ', error.message)
        res.status(400).json({ message: 'something went wrong' })
    }
}

async function login(req: Request, res: Response) {
    try {
        const data = await auth.api.signInEmail({
            body: {
                ...req.body
            },

        });
        const token = data.token; // 👈 get token from response

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token not received"
            });
        }

        // 🔥 Manually set cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "lax", // use "none" in production cross-site
            maxAge: 24 * 60 * 60 * 1000 // 1 days
        });

        res.json({ success: true, data })
    }
    catch (error: any) {
        console.log('Error: ', error.message)
        res.status(400).json({ message: 'something went wrong' })
    }
}

async function getMe(req: Request, res: Response) {
    console.log({ session: req.session })
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.session?.userId },
        });
        console.log('user: ', user)
        res.json({ success: true, data: user })
    }
    catch (error: any) {
        console.log('Error: ', error.message)
        res.status(401).json({ message: 'something went wrong' })
    }
}

async function logout(req: Request, res: Response) {
    try {
        const response = await auth.api.signOut({
            headers: req.headers as HeadersInit
        });
        console.log('response: ', response)
        res.json({ success: true, message: 'Logged out successfully' })
    }
    catch (error: any) {
        console.log('Error: ', error.message)
        res.status(400).json({ message: 'something went wrong' })
    }
}

async function getSession(req: Request, res: Response) {
    try {
        res.json({ success: true, data: req.session })
    }
    catch (error: any) {
        console.log('Error: ', error.message)
        res.status(401).json({ message: 'something went wrong' })
    }
}
export const authController = {
    // getProfile,
    register,
    login,
    getMe,
    logout,
    getSession

}