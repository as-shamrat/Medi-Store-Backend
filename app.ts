import { toNodeHandler } from 'better-auth/node';
import express, { Request, Response } from 'express'
import { auth } from './lib/auth';

const app = express()

app.get('/api/auth/me', async (req: Request, res: Response) => {
    try {
        const session = await auth.api.getSession({ headers: req.headers as HeadersInit });
        console.log('session: ', session)
        res.json({ success: true, data: session?.user })
    }
    catch (error: any) {
        console.log('Error: ', error.message)
        res.status(401).json({ message: 'something went wrong' })
    }
})

app.all("/api/auth/*splat", toNodeHandler(auth));


export default app;