import { Request, Response, NextFunction } from 'express';
import Controller, { Methods } from '../typings/controller';
import Token from './../functions/auth/authorizer';


export default class TokenrizeController extends Controller {
    path = '/';
    routes = [
        {
            path: '/auth',
            method: Methods.GET,
            handler: this.tokenrize,
            localMiddleware: [Token.verify],
        },
    ];

    async tokenrize(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const msg = { text: 'Have a token!!!', token: req.headers.authorization }
            super.sendSuccess(res, msg)
        } catch (e) {
            console.log(e);
            super.sendError(res);
        }
    }
}