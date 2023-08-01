"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotEnv = __importStar(require("dotenv"));
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
        dotEnv.config();
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
