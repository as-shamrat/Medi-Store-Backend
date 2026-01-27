
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";


// If your Prisma file is located elsewhere, you can change the path



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: 'CUSTOMER'
            },
            phone: {
                type: "string",
                required: false
            },
            address: {
                type: "string",
                required: false
            },
            status: {
                type: 'string',
                required: false,
                defaultValue: 'ACTIVE'
            }
        }
    },
});