// express
import express, { Application, RequestHandler } from 'express';

// Server structure
import Server from "./src/typings/server";
import db from "./src/models/index"

// configuration
import { PORT } from './src/config';

// Middlewares
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

// Controllers
import HelloWorldController from './src/controllers/helloworld';
import TokenrizeController from './src/controllers/testauth';


const app: Application = express();
const server: Server = new Server(app, db.sequelize, PORT);


// Sequential start server
Promise.resolve(() => { })
    .then(async () => {
        await server.loadMiddleware([
            urlencoded({ extended: false }),
            json(),
            cors({ credentials: true, origin: true })
        ])

        await server.loadControllers([
            new HelloWorldController(),
            new TokenrizeController()
        ])
    })
    .then(() => { server.run() })