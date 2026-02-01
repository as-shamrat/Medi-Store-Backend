import { prisma } from "../lib/prisma"

async function updateProfile(userId: string, data: { name?: string, email?: string, phone?: string, address?: string }) {
    return await prisma.user.update({ where: { id: userId }, data: data })
}

export const profileService = { updateProfile }