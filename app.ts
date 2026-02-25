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
import authRouter from './auth/authRouter';
import { globalErrorHandler } from './middleware/globalError';
import { notFoundHandler } from './middleware/notFoundError';

const app = express()

app.use(express.json())

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true, // VERY IMPORTANT for cookies
    })
);
// const allowedOrigins = [
//     "http://localhost:3000",
//     "https://medistore-client-chi.vercel.app",
//     "https://medistore-client-b33ip4g1u-mohammed-arif-shahriars-projects.vercel.app",
// ];

// // Regex for any Vercel preview URL
// const vercelRegex = /^https:\/\/medistore-client.*\.vercel\.app$/;

// app.set("trust proxy", 1);

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin) return callback(null, true); // Allow Postman or server-to-server requests
//         const isAllowed = allowedOrigins.includes(origin) || vercelRegex.test(origin);
//         if (isAllowed) return callback(null, true);
//         callback(new Error(`Origin ${origin} not allowed by CORS`));
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
//     exposedHeaders: ["Set-Cookie"],
// }));
// Handle preflight requests




// app.get('/api/auth/me', async (req: Request, res: Response) => {
//     try {
//         const session = await auth.api.getSession({ headers: req.headers as HeadersInit });
//         console.log('session: ', session)
//         res.json({ success: true, data: session?.user })
//     }
//     catch (error: any) {
//         console.log('Error: ', error.message)
//         res.status(401).json({ message: 'something went wrong' })
//     }
// })


// app.all("/api/auth/*splat", toNodeHandler(auth));


app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/medicines', medicineRouter)
app.use('/api/orders', orderRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/profile', profileRouter)
app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app;