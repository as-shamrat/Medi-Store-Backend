import { prisma } from "../lib/prisma"
enum OrderStatus {
    PENDING = 'PENDING',
    SHIPPED = "SHIPPED",
    CANCELLED = "CANCELLED",
    DELIVERED = "DELIVERED",
    CONFIRMED = "CONFIRMED"
}
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

async function updateUser(id: string, data: { status: 'ACTIVE' | 'BANNED' }) {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
        throw new Error("User not found")
    }
    return await prisma.user.update({
        where: { id }, data: data, select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true
        }
    })
}

async function getAdminOrders(payload: { page?: string, limit?: string }) {
    let take = Number(payload.limit)
    let skip = (Number(payload.page) - 1) * take
    const orders = await prisma.order.findMany({
        skip: skip,
        take: take,
        select: {
            id: true,
            status: true,
            createdAt: true,
            shippingMethod: true,
            totalPrice: true,
            customer: { select: { name: true, email: true } },
            items: { select: { seller: { select: { name: true } }, quantity: true } }

        }
    })
    const formattedOrders = orders.map(order => {
        const sellersSet = new Set<string>();
        let totalQuantity = 0;

        order.items.forEach(item => {
            sellersSet.add(item.seller.name);
            totalQuantity += item.quantity;
        });

        return {
            id: order.id,
            status: order.status,
            createdAt: order.createdAt,
            shippingMethod: order.shippingMethod,
            totalPrice: order.totalPrice,
            customer: order.customer,
            sellers: Array.from(sellersSet),
            itemsCount: order.items.length,
            totalQuantity: totalQuantity
        };
    });
    return formattedOrders

}

async function updateAdminOrder(orderId: string, data: { status: OrderStatus }) {
    return await prisma.order.update({
        where: { id: orderId },
        data: data
    })
}



export const adminService = { getAllUsers, updateUser, getAdminOrders, updateAdminOrder }