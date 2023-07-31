"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = process.env.PORT || 4000;
        this.config();
        this.routes();
        this.listen();
    }
    config() {
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                status: 200,
                message: "welcome in ts POST api"
            });
        });
        this.app.use('/api/users', users_routes_1.default);
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
    listen() {
        const port = this.PORT;
        this.app.listen(port, () => console.log(`SERVER IS WORKED ON PORT ${port}`));
    }
}
new Server();
// new User('ahmed sadek', 'amr.sadek@yahoo.com', '12345', 'sadek.png').register()
// .then(res => console.log(res))
// .catch(e => console.log(e))
// new User().login({email: 'a.sadekAmr@yahoo.com', password: "1234"})
//      .then(res => console.log(res))
//  .catch(e => console.log(e))
