import { Request, Response, NextFunction } from 'express';
import Controller, { Methods } from './index';

export default class HelloWorldController extends Controller {
    path = '/';
    routes = [
        {
            path: '/',
            method: Methods.GET,
            handler: this.hello,
            localMiddleware: [],
        },
    ];

    async hello(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const msg = { text: 'hello world!' }
            super.sendSuccess(res, msg)
        } catch (e) {
            console.log(e);
            super.sendError(res);
        }
    }
}