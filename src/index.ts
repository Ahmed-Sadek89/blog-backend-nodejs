import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import cors from 'cors';
import * as dotEnv from 'dotenv';
import userRoutes from './routes/users.routes';
import cateoriesRoutes from './routes/categories.routes';
import { corsOptions } from './config/cors';


class Server {
    private app: Express
    private PORT: number | string
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 4000
        this.config();
        this.routes();
        this.listen()
    }

    private config() {
       
        this.app.use(cors(corsOptions))

        this.app.use(express.json())
        dotEnv.config();
    }

    private routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                status: 200,
                message: "welcome in ts RESTapi"
            })
        });
        // users
        this.app.use('/api/users', userRoutes)
        // categories
        this.app.use('/api/categories', cateoriesRoutes)
        // posts
        // this.app.use('/api/posts', postsRoutes)
    }

    private listen() {
        const port = this.PORT
        this.app.listen(port, () => console.log(`SERVER IS WORKED ON PORT ${port}`))
    }
}

new Server();
