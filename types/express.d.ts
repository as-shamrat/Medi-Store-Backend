import { Session, User } from "better-auth";

declare global {
    namespace Express {
        interface Request {
            user?: User; // optional, coming from BetterAuth session
            session?: any;       // optional, full session object
        }
    }
}