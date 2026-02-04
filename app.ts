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



app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, Postman, etc.)
            if (!origin) return callback(null, true);

            // Check if origin is in allowedOrigins or matches Vercel preview pattern
            const isAllowed =
                allowedOrigins.includes(origin) ||
                /^https:\/\/medistore-client-chi-.*\.vercel\.app$/.test(origin);

            if (isAllowed) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        exposedHeaders: ["Set-Cookie"],
    }),
);


// app.use(cors({
//     origin: "https://medistore-client-chi.vercel.app", // Your Frontend URL
//     credentials: true,                               // Allowed for Better Auth cookies
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
// }));
// app.options("*", cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://medistore-client-chi.vercel.app');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
//     res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Cookie');

//     // Handle the Preflight (OPTIONS) request immediately
//     if (req.method === 'OPTIONS') {
//         res.status(200).end();
//         return;
//     }
//     next();
// });
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

app.use(express.json())

app.use('/api/admin', adminRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/medicines', medicineRouter)
app.use('/api/orders', orderRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/profile', profileRouter)
app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app;