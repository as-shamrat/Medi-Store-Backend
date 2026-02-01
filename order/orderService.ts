import { prisma } from "../lib/prisma"

async function getOrders(userId: string, payload: { page?: string, limit?: string }) {
    const { page, limit } = payload

    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    return await prisma.order.findMany({
        where: { customerId: userId },
        skip,
        take,
        select: {
            id: true,
            totalPrice: true,
            address: true,
            createdAt: true,
            status: true,
            customer: {
                select: { id: true, name: true, status: true, email: true }
            },
            items: true
        }
    })
}
async function getOrderById(orderId: string) {
    return await prisma.order.findUnique({
        where: { id: orderId }, select: {
            id: true,
            totalPrice: true,
            address: true,
            status: true,
            customerId: true,
            customer: {
                select: { name: true, email: true }
            },
            items: { select: { medicine: { select: { name: true } }, price: true, quantity: true } }
        }
    })
}
async function createOrder(userId: string, payload: { address: string, items: { medicineId: string, quantity: number }[] }) {
    console.log('UserId: ', userId, 'Items: ', payload.items, 'Address: ', payload.address)
    const { address, items } = payload
    const medicines = await prisma.medicine.findMany({
        where: {
            id: { in: items.map(i => i.medicineId) }
        }
    })
    if (medicines.length !== items.length) {
        throw new Error('Invalid medicine in order')
    }
    // console.log('Medicines: ', medicines)

    let totalPrice = 0;

    let orderItemsData = items.map(i => {
        const medicine = medicines.find(m => m.id === i.medicineId)

        totalPrice += Number(medicine?.price) * Number(i.quantity)

        return {
            medicineId: medicine?.id as string,
            sellerId: medicine?.sellerId as string,
            quantity: Number(i.quantity) as number,
            price: Number(medicine?.price) as number
        }
    })

    console.log('OrderItemsData: ', orderItemsData)

    return await prisma.order.create({
        data: { customerId: userId, address: address, totalPrice: totalPrice, items: { create: orderItemsData } },
        include: { items: true }

    });
}

export const orderService = { getOrders, getOrderById, createOrder }