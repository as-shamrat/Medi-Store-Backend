
import { prisma } from "../lib/prisma"

async function getSellerOrders(sellerId: string, payload: { page: string, limit: string }) {
    console.log({ sellerId })
    const orders = await prisma.order.findMany({
        where: {
            items: {
                some: { sellerId: sellerId }
            }
        },
        select: {
            items: {
                where: { sellerId: sellerId },
                select: { medicine: { select: { name: true } }, price: true, quantity: true }
            },
            customer: {
                select: { name: true, email: true, phone: true }
            },
            createdAt: true,
            totalPrice: true,
            address: true
        }
    })
    const sellerTotal = orders.map(order => order.items).flat().reduce((total: number, item: any) => total + item.price * item.quantity, 0)
    console.log({ sellerTotal })

    return { orders, sellerTotal };
}

async function addMedicine(sellerId: string, data: { name: string, description: string, price: number, stock: number, manufacturer: string, categoryId: string }) {
    console.log('medicine data: ', { ...data, sellerId })
    const medicineExist = await prisma.medicine.findFirst({
        where: {
            name: data.name,
            sellerId: sellerId
        }
    })
    if (medicineExist) {
        throw new Error('Medicine already exists from same seller')
    }
    return await prisma.medicine.create({
        data: { ...data, sellerId: sellerId }
    })
    return null
}
async function updateMedicine(sellerId: string, medicineId: string, data: { price?: number, stock?: number }) {
    console.log(sellerId, medicineId, data)
    const isSeller = await prisma.medicine.findFirst({
        where: { sellerId: sellerId, id: medicineId }
    })
    if (!isSeller) {
        throw new Error("Not authorized to update this medicine")
    }
    return await prisma.medicine.update({ where: { id: medicineId }, data: data })
}

async function deleteMedicine(sellerId: string, medicineId: string) {
    console.log({ medicineId, sellerId })
    const medicine = await prisma.medicine.findUnique({ where: { id: medicineId } })
    if (medicine?.sellerId !== sellerId) {
        throw new Error("You can not delete this medicine")
    }
    return await prisma.medicine.delete({ where: { id: medicineId } });
}

export const sellerService = { addMedicine, updateMedicine, deleteMedicine, getSellerOrders }