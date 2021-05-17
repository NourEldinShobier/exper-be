import * as dotenv from 'dotenv';
import { ENV } from '../constants';


dotenv.config();


export const NODE_ENV: string = process.env.NODE_ENV || ENV.DEVELOPMENT
export const PORT: number = +process.env.PORT || 3000