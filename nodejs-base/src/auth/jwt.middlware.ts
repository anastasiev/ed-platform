import { verify } from 'jsonwebtoken';
import {HEADER_NAME, JWT_SECRET} from "./auth.constants";

export const jwtVerificationMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers[HEADER_NAME];
    if (!token) {
        return res.status(401).send({message: 'No token provided'});
    }
    try {
        const decoded = verify(token, JWT_SECRET);
        req.currentUser = (decoded as any).user;
        return next();
    } catch (e) {
        return res.status(401).send({message: 'Invalid token'});
    }
};
