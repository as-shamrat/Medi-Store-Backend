import { NextFunction, Request, Response } from "express"
import { auth } from "../lib/auth"
import { prisma } from "../lib/prisma"


export const requireAuth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('middleware working...', req.body)
        console.log('Roles: ', roles)
        const token = req.headers.authorization?.split(" ")[1];
        console.log('Token: ', token)
        const session = await prisma.session.findUnique({
            where: { token },
            include: {
                user: true
            }
        })
        console.log('Session: ', session)
        if (!session || !session.user) {
            return res.status(401).json({ message: "Unauthenticated" });
        }
        if (roles.length !== 0 && !roles.includes(session.user.role as string)) {
            return res.status(401).json({ message: "Unauthorized" });

        }
        req.user = { ...session?.user };

        req.session = session
        next()
    }
}