
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";


import '../env'

const isProd = process.env.NODE_ENV === "production";


export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL as string,
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
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
        "https://medistore-client-chi.vercel.app",
        process.env.FRONTEND_URL as string,
        "http://localhost:3000"
    ],
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        },
    },
    advanced: {
        cookiePrefix: "better-auth",
        useSecureCookies: isProd,        // true in production, false in dev
        sameSite: isProd ? "none" : "lax", // none for cross-site
        crossSubDomainCookies: { enabled: false },
        disableCSRFCheck: true,           // allow requests without Origin header (Postman/mobile)
    }



});


// advanced: {
//     cookiePrefix: "better-auth",
//     useSecureCookies: true,
//     crossSubDomainCookies: {
//         enabled: false,
//     },
//     disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
// }

//   advanced: {
//     cookiePrefix: "better-auth",
//     useSecureCookies: process.env.NODE_ENV === "production",
//     crossSubDomainCookies: {
//       enabled: false,
//     },
//     disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
//   }