import { NextFunction, Request, Response } from "express"
import { auth } from "../lib/auth"


export const requireAuth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('middleware working...', req.body)
        console.log('Roles: ', roles)
        const session = await auth.api.getSession({ headers: req.headers as HeadersInit })
        console.log('Session: ', session)
        if (!session || !session.user) {
            return res.status(401).json({ message: "Unauthenticated" });
        }
        if (roles.length !== 0 && !roles.includes(session.user.role as string)) {
            return res.status(401).json({ message: "Unauthorized" });

        }
        req.user = session?.user;
        req.session = session
        next()
    }
}