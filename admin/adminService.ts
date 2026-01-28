import { prisma } from "../lib/prisma"

async function getAllUsers() {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true
        }
    })
}

async function updateUser(id: string, status: 'ACTIVE' | 'BANNED') {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
        throw new Error("User not found")
    }
    return await prisma.user.update({
        where: { id }, data: { status }, select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true
        }
    })
}

export const adminService = { getAllUsers, updateUser }