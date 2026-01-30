import { toNodeHandler } from 'better-auth/node';
import express, { Request, Response } from 'express'
import { auth } from './lib/auth';

import adminRouter from './admin/adminRouter'
import categoryRouter from './category/categoryRouter'
import medicineRouter from './medicine/medicineRouter'
import orderRouter from './order/orderRouter'
import sellerRouter from './seller/sellerRouter'
import { globalErrorHandler } from './middleware/globalError';

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

app.use(express.json())

app.use('/api/admin', adminRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/medicines', medicineRouter)
app.use('/api/orders', orderRouter)
app.use('/api/seller', sellerRouter)
app.use(globalErrorHandler)

export default app;