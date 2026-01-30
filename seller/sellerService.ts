import { prisma } from "../lib/prisma"

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

export const sellerService = { addMedicine }