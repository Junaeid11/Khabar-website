import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../app/modules/Users/user.interface";

declare global {
    namespace Express {
        interface Request{
            email: JwtPayload,
            user :TUser;
            socketAuthToken: string;
        }
    }
}