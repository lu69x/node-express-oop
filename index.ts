// express
import express, { Application, RequestHandler } from 'express';

// Server structure
import Server from "./src/server";
import db from "./src/models/index"

// Middlewares
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

// Controllers
import HelloWorldController from './src/controllers/helloworld';

// configuration
import { PORT } from './src/config';


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
            new HelloWorldController()
        ])
    })
    .then(() => { server.run() })