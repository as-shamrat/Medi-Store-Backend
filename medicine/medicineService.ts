import { prisma } from "../lib/prisma"

async function getAllMedicines(payload: { search: string }) {
    return await prisma.medicine.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: payload.search,
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: payload.search,
                        mode: 'insensitive'
                    }
                },
                {
                    category: {
                        name: {
                            contains: payload.search,
                            mode: 'insensitive'
                        }
                    }
                }
            ]

        },
        select: {
            id: true,
            name: true,
            description: true,
            manufacturer: true,
            price: true, createdAt: true,
            stock: true,
            seller: {
                select: {
                    id: true,
                    name: true
                }
            },
            category: {
                select: { id: true, name: true }
            }
        }
    })
}

async function getMedicineById(id: string) {
    return await prisma.medicine.findUnique({
        where: { id: id }, select: {

            id: true,
            name: true,
            description: true,
            manufacturer: true,
            price: true, createdAt: true,
            stock: true,
            seller: {
                select: {
                    id: true,
                    name: true
                }
            },
            category: {
                select: { id: true, name: true }
            }

        }
    })
}


export const medicineService = { getAllMedicines, getMedicineById }