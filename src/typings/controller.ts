import { Response, Request, NextFunction, Router } from 'express';

export enum Methods {
    ALL = 'all',
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
    OPTIONS = 'options',
    HEAD = 'head',
}

interface IRoute {
    path: string;
    method: Methods;
    handler: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void | Promise<void>;
    localMiddleware: ((
        req: Request,
        res: Response,
        next: NextFunction
    ) => void)[];
}

export default abstract class Controller {
    public router: Router = Router();
    public abstract path: string;
    protected abstract readonly routes: Array<IRoute>;

    public setRoutes = (): Router => {
        for (const route of this.routes) {
            for (const mw of route.localMiddleware) {
                this.router.use(route.path, mw);
            }
            try {
                this.router[route.method](route.path, route.handler);
            } catch (err) {
                console.error('not a valid method');
            }
        }

        return this.router;
    };
    // these methods below must not be a properties< but methods (no "=>")
    protected sendSuccess(res: Response, data: object, message?: string): Response {
        return res.status(200).json({
            code: 200,
            message: message || 'success',
            data: data,
        });
    }

    protected createSuccess(res: Response, data: object, message?: string): Response {
        return res.status(201).json({
            code: 201,
            message: message || 'created',
        });
    }

    protected redirected(res: Response, data: object, message?: string): Response {
        return res.status(302).json({
            code: 302,
            message: message || 'redirect',
            data: data,
        });
    }

    protected badRequest(res: Response, message?: string): Response {
        return res.status(400).json({
            code: 400,
            message: message || 'bad request',
        });
    }

    protected unauthorized(res: Response, message?: string): Response {
        return res.status(401).json({
            code: 401,
            message: message || 'unauthorized'
        });
    }

    protected sendError(res: Response, message?: string): Response {
        return res.status(500).json({
            code: 500,
            message: message || 'internal server error',
        });
    }
}