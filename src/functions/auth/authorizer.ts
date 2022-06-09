import { Request, Response, NextFunction } from 'express';

export default class Token {
    public static verify(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        const header = req.headers.authorization;
        if (!header) {
            //  Not have a token
            res.json({
                data: {
                    tokenVerificationData: {
                        access: false,
                        message: 'No token provided',
                    },
                },
            });
            return;

        } else {
            // have a token
            next();
        }
    }
}