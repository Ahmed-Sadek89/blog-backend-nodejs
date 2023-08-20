import * as dotEnv from 'dotenv';

dotEnv.config()

const origin = process.env.FRONT_END_LINK
export var corsOptions = {
    origin,
    optionsSuccessStatus: 200
}