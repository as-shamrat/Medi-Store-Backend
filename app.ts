import { toNodeHandler } from 'better-auth/node';
import express, { Request, Response } from 'express'
import cors from 'cors'
import { auth } from './lib/auth';

import adminRouter from './admin/adminRouter'
import categoryRouter from './category/categoryRouter'
import medicineRouter from './medicine/medicineRouter'
import orderRouter from './order/orderRouter'
import sellerRouter from './seller/sellerRouter'
import profileRouter from './profile/profileRouter'
import { globalErrorHandler } from './middleware/globalError';
import { notFoundHandler } from './middleware/notFoundError';

const app = express()
const allowedOrigins = [
    "https://medistore-client-chi.vercel.app",
];



app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const isAllowed = allowedOrigins.includes(origin) ||
            /^https:\/\/medistore-client-chi-.*\.vercel\.app$/.test(origin);
        if (isAllowed) callback(null, true);
        else callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
}));
// Handle preflight requests
app.options("*", cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
}));




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

app.use(express.json())
app.all("/api/auth/*splat", toNodeHandler(auth));



app.use('/api/admin', adminRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/medicines', medicineRouter)
app.use('/api/orders', orderRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/profile', profileRouter)
app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app;