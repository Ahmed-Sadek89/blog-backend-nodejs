import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import User from './models/user.model';
import userRoutes from './routes/users.routes';


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
        this.app.use(express.json())
    }

    private routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                status: 200,
                message: "welcome in ts POST api"
            })
        });
        this.app.use('/api/users', userRoutes)
        // this.app.get('/users', (req: Request, res: Response) => {
        //     new User('ahmed sadek', 'amr.sadek@yahoo.com', '12345', 'sadek.png').getAllUsers()
        //         .then(result => {
        //             res.status(200).json({
        //                 status: 200,
        //                 result
        //             })
        //         })
        //         .catch(e => {
        //             res.status(400).json({
        //                 status: 200,
        //                 e
        //             })
        //         })
        // });
        // user
        // posts
        // categories
    }

    private listen() {
        const port = this.PORT
        this.app.listen(port, () => console.log(`SERVER IS WORKED ON PORT ${port}`))
    }
}

new Server();


// new User('ahmed sadek', 'amr.sadek@yahoo.com', '12345', 'sadek.png').register()
// .then(res => console.log(res))
// .catch(e => console.log(e))


// new User().login({email: 'a.sadekAmr@yahoo.com', password: "1234"})
//      .then(res => console.log(res))
//  .catch(e => console.log(e))