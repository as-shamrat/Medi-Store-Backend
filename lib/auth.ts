
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";


import '../env'



export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
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
    trustedOrigins: [
        "https://medistore-client-chi.vercel.app"],
    advanced: {
        disableOriginCheck: true,
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        },
        useSecureCookies: true,
    }

});