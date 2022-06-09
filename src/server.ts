import { Application, RequestHandler } from "express";
import { Sequelize } from "sequelize";
import http from 'http'
import Controller from "./controllers";


export default class Server {
    private app: Application;
    private database: Sequelize;
    private readonly port: number;

    constructor(app: Application, database: Sequelize, port: number) {
        this.app = app
        this.database = database;
        this.port = port;
    }

    public run(): http.Server {
        return this.app.listen(this.port, () => {
            console.log(`The server is running on port ${this.port}`);
        })
    }

    public loadMiddleware(middlewares: Array<RequestHandler>): void {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }

    public loadControllers(controllers: Array<Controller>): void {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.setRoutes());
        });
    }

    public async initDatabase(): Promise<void> {
        try {
            await this.database.authenticate();
            console.log('Database is successfully authenticated');
        } catch (err) {
            console.log(err);
        }
    }
}